export type LlmData = {
  id: string, //uuid.
  model: string, //llm model.
  input_tokens: number,
  output_tokens: number,
  reasoning_tokens: number,
  total_tokens: number,
  created_timestamp: number,
}