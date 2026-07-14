import { EasyInputMessage, ResponseInput, ResponseInputItem } from "openai/resources/responses/responses";
import { openaiClient } from "../Server";
import { AiData, openAiResponseToAiData } from "./AiData";
import { AiProvider } from "./AiProvider";
import { ChatParams } from "./ChatParams";

export class OpenAiProvider implements AiProvider {
  /**
   * Send a chat request to OpenAI.
   * @param params - `ChatParams` - Paremeters for sending a chat message.
   * @returns AiData object with stats from the response.
   */
  async chat(chatParams: ChatParams): Promise<AiData> {
    const response = await openaiClient.responses.create({
      model: chatParams.model,
      input: chatParams.inputs as ResponseInput,
      instructions: chatParams.systemLevelInstructions,
      max_output_tokens: chatParams.maxOutputTokens,
    });

    return openAiResponseToAiData(response);
  }
}