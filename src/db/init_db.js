import { TheDB } from "./db.js";

export const initDb = () => {
  try {
    console.log("Initializing the DB...");
    TheDB.exec("BEGIN");
    TheDB.exec(`CREATE TABLE chat_data(
      id TEXT PRIMARY KEY,
      response_id TEXT,
      chat_id TEXT,
      prompt TEXT,
      response TEXT,
      prompt_char_count INTEGER,
      response_char_count INTEGER,
      prompt_tokens INTEGER,
      completion_tokens INTEGER,
      reasoning_tokens INTEGER,
      date TEXT
    );`);
    TheDB.exec("COMMIT");
    console.log("Finished initializing the DB.");
  }
  catch (error) {
    TheDB.exec("ROLLBACK");
    console.log(`ERROR initDb: ${error.message}`);
  }
  finally {
    console.log("Exiting.");
    process.exit(0);
  }
}

initDb();