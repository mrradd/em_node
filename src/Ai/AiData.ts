import { Message } from "@anthropic-ai/sdk/resources.js"
import { Response } from "openai/resources/responses/responses.js"

export interface AiData {
  model: string,
  inputTokens: number,
  outputTokens: number,
  reasoningTokens: number,
  totalTokens: number,
  responseText: string,
}

export const openAiResponseToAiData = ({model, usage, output_text}: Response): AiData => {
  return {
    model: model,
    inputTokens: usage?.input_tokens ?? 0,
    outputTokens: usage?.output_tokens ?? 0,
    reasoningTokens: usage?.output_tokens_details.reasoning_tokens ?? 0,
    totalTokens: usage?.total_tokens ?? 0,
    responseText: output_text,
  } as AiData
}

export const anthropicMessageToAiData = ({usage, content, model}: Message): AiData => {
  const inTokens = usage.input_tokens ?? 0;
  const outTokens = usage.output_tokens ?? 0;
  const reasonTokens = usage.output_tokens_details?.thinking_tokens ?? 0;
  const sumTokens = inTokens + outTokens + reasonTokens;

  let text = "";
  for (const block of content) {
    if (block.type === "text") {
      text = block.text;
    }
  }

  return {
    model: model,
    inputTokens: inTokens,
    outputTokens: outTokens,
    reasoningTokens: reasonTokens,
    totalTokens: sumTokens,
    responseText: text,
  } as AiData
}