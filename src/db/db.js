import sqlite from "node:sqlite";
import crypto from "crypto";

export const TheDB = new sqlite.DatabaseSync("electric_meatball.db");

export class ChatDataService {
  static getAllChats () {
    try {
      const query = TheDB.prepare("SELECT * FROM chat_data");
      const dbResult = query.all();
      return dbResult;
    }
    catch (error) {
      console.log(`ERROR: getAllMessages: ${error.message}`);
      return null;
    }
  }

  static saveChatData({
    response_id,
    chat_id,
    prompt,
    response,
    prompt_tokens,
    completion_tokens,
    reasoning_tokens,
  }) {
    try {
      TheDB.exec("BEGIN");
      const insertChatData = TheDB.prepare(`
      INSERT INTO chat_data(id, response_id, chat_id, prompt, response, prompt_char_count,
        response_char_count, prompt_tokens, completion_tokens, reasoning_tokens, date)
      VALUES(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?);`);

      const date = new Date();

      insertChatData.run(
        crypto.randomUUID(),
        response_id,
        chat_id,
        prompt,
        response,
        prompt.length,
        response.length,
        prompt_tokens,
        completion_tokens,
        reasoning_tokens,
        `${date.toISOString()}`,
      );

      TheDB.exec("COMMIT;");
      return true;
    }
    catch (error) {
      TheDB.exec("ROLLBACK;");
      console.log(`ERROR: saveChatData: ${error.message}`);
      return false;
    }
  }
}