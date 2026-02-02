import { LlmData } from "../models/LlmData";
import { TheDb } from "../Server";

export class LlmDataDBA {
  static createData(model: string, inputTokens: number, outputTokens: number, reasoningTokens: number, totalTokens: number): LlmData {
    const insertStmt = TheDb.prepare(`
  INSERT INTO llm_datas (id, model, input_tokens, output_tokens, reasoning_tokens, total_tokens, created_timestamp)
  VALUES(@id, @model, @input_tokens, @output_tokens, @reasoning_tokens, @total_tokens, @created_timestamp);`);

    const newData: LlmData = {
      id: crypto.randomUUID(),
      model: model,
      input_tokens: inputTokens,
      output_tokens: outputTokens,
      reasoning_tokens: reasoningTokens,
      total_tokens: totalTokens,
      created_timestamp: Date.now(),
    };

    const txn = TheDb.transaction((data: LlmData) => {
      insertStmt.run(data);
    });

    txn(newData);

    return newData;
  }
}