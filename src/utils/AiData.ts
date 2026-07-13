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

export const openAiResponseToAiData = (response: Response): AiData => {
  return {
    model: response.model,
    inputTokens: response.usage?.input_tokens ?? 0,
    outputTokens: response.usage?.output_tokens ?? 0,
    reasoningTokens: response.usage?.output_tokens_details.reasoning_tokens ?? 0,
    totalTokens: response.usage?.total_tokens ?? 0,
    responseText: response.output_text,
  } as AiData
}

export const anthropicMessageToAiData = (message: Message): AiData => {
  const inTokens = message.usage.input_tokens ?? 0;
  const outTokens = message.usage.output_tokens ?? 0;
  const reasonTokens = message.usage.output_tokens_details?.thinking_tokens ?? 0;
  const sumTokens = inTokens + outTokens + reasonTokens;
  console.log(message.content)//todo ch. delete
  let text = "";
  for (const block of message.content) {
    if (block.type === "text") {
      text = block.text;
    }
  }

  return {
    model: message.model,
    inputTokens: inTokens,
    outputTokens: outTokens,
    reasoningTokens: reasonTokens,
    totalTokens: sumTokens,
    responseText: text,
  } as AiData
}