import sqlite from "node:sqlite";
import crypto from "crypto";
import { ChatDataModel } from "./models.js";

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
      let newChatObj = new ChatDataModel();
      newChatObj = {
        id: crypto.randomUUID(),
        response_id: response_id,
        chat_id: chat_id,
        prompt: prompt,
        response: response,
        prompt_char_count: prompt.length,
        response_char_count: response.length,
        prompt_tokens: prompt_tokens,
        completion_tokens: completion_tokens,
        reasoning_tokens: reasoning_tokens,
        date_iso: `${date.toISOString()}`,
      };

      insertChatData.run(
        newChatObj.id,
        newChatObj.response_id,
        newChatObj.chat_id,
        newChatObj.prompt,
        newChatObj.response,
        newChatObj.prompt_char_count,
        newChatObj.response_char_count,
        newChatObj.prompt_tokens,
        newChatObj.completion_tokens,
        newChatObj.reasoning_tokens,
        newChatObj.date_iso,
      );

      TheDB.exec("COMMIT;");
      return newChatObj;
    }
    catch (error) {
      TheDB.exec("ROLLBACK;");
      console.log(`ERROR: saveChatData: ${error.message}`);
      return null;
    }
  }
}