import { MessageParam } from "@anthropic-ai/sdk/resources";
import { EasyInputMessage, ResponseCreateParamsNonStreaming, ResponseInputItem } from "openai/resources/responses/responses";

export interface ChatParams {
  model: string,
  inputs: EasyInputMessage[] | MessageParam[],
  systemLevelInstructions?: string,
  maxOutputTokens?: number,
}