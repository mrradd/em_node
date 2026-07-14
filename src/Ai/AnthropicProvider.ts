import { Message, MessageParam } from "@anthropic-ai/sdk/resources";
import { anthropicClient } from "../Server";
import { AiData, anthropicMessageToAiData } from "./AiData";
import { AiProvider } from "./AiProvider";
import { ChatParams } from "./ChatParams";

export class AnthropicProvider implements AiProvider {
  async chat(params: ChatParams): Promise<AiData> {
    const message: Message = await anthropicClient.messages.create({
      max_tokens: params.maxOutputTokens ?? 4096,
      system: params.systemLevelInstructions,
      messages: params.inputs as MessageParam[],
      model: params.model,
    });

    return anthropicMessageToAiData(message);
  }
}