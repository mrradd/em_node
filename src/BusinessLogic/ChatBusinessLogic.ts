import OpenAI from "openai";
import { Chat } from "../models/Chat";
import { MODEL, OPENAI_API_KEY } from "../EMConfig";
import { ChatRequestDTO } from "../DTOs/ChatRequestDTO";
import { ChatDBA } from "../DBAs/ChatDBA";

const openaiClient = new OpenAI({
  apiKey: OPENAI_API_KEY
});

async function sendChatRequest({ message, threadId }: ChatRequestDTO): Promise<string | null> {
  const chats: Chat[] | null = ChatDBA.getChatsInThread(threadId);

  //Get all the previous chats in the thread to send in the request.
  //HACK: using `any` to make the compiler shut up.
  const inputs: any = chats!.map((chat) => {
    return {
      role: chat.role,
      content: chat.message,
    };
  });

  //Add the new message to the end of the input list.
  inputs.push({ role: 'user', content: message });

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

  ChatDBA.saveChat(newResponse);

  //todo ch save response data.
  //todo ch create response dto.
  return response.output_text;
}

export const ChatBusinessLogic = {
  sendChatRequest,
}