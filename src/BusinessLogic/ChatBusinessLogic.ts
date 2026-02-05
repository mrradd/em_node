import OpenAI from "openai";
import { Chat } from "../models/Chat";
import { MODEL, OPENAI_API_KEY } from "../EMConfig";
import { ChatRequestDTO } from "../DTOs/ChatRequestDTO";
import { ChatDBA } from "../DBAs/ChatDBA";
import { LlmDataDBA } from "../DBAs/LlmDataDBA";
import { ChatResponseDTO } from "../DTOs/ChatResponseDTO";

const openaiClient = new OpenAI({
  apiKey: OPENAI_API_KEY
});

export class ChatBusinessLogic {
  /**
   * Sends a chat request to the OpenAI Responses API using prior thread context,
   * persists the user and assistant messages, records usage metrics, and returns
   * the saved assistant message as a ChatResponseDTO.
   * @param message - User message to send to the LLM.
   * @param threadId - Chat Thread ID this chat is part of.
   * @returns ChatResponseDTO object with the last assistant message.
   */
  static async sendChatRequest({ message, threadId }: ChatRequestDTO): Promise<ChatResponseDTO> {
    const chats: Chat[] | null = ChatDBA.getChatsInThread(threadId);

    //Get all the previous chats in the thread to send in the request.
    //HACK: using `any` to make the compiler shut up.
    const inputs: any = chats!.map((chat) => {
      return {
        role: chat.role,
        content: chat.message,
      };
    });

    //Ensure the system prompt is at the beginning.
    inputs.unshift({ role: "system", content: "You will return all responses in structured Markdown." });

    //Add the new message to the end of the input list.
    inputs.push({ role: "user", content: message });

    const response = await openaiClient.responses.create({
      model: MODEL,
      input: inputs,
    });

    const newChat = {
      thread_id: threadId,
      message: message,
      role: "user",
    } as Chat;

    ChatDBA.saveChat(newChat);

    const newResponse = {
      thread_id: threadId,
      message: response.output_text,
      role: "assistant",
    } as Chat;

    const resultResponse = ChatDBA.saveChat(newResponse);

    LlmDataDBA.createData(
      response.model,
      response.usage?.input_tokens ?? 0,
      response.usage?.output_tokens ?? 0,
      response.usage?.output_tokens_details.reasoning_tokens ?? 0,
      response.usage?.total_tokens ?? 0);

    return {
      id: resultResponse.id,
      threadId: resultResponse.thread_id,
      message: resultResponse.message,
      createdTimestamp: resultResponse.created_timestamp,
      role: resultResponse.role,
    } as ChatResponseDTO;
  }
}