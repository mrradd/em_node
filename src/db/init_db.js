import { TheDB } from "./db.js";

export const initDb = () => {
  try {
    console.log("Initializing the DB...");
    TheDB.exec("BEGIN");
    TheDB.exec(`CREATE TABLE IF NOT EXISTS chat_data(
      id TEXT PRIMARY KEY,
      chat_id TEXT,
      prompt TEXT,
      response TEXT,
      prompt_char_count INTEGER,
      response_char_count INTEGER,
      prompt_tokens INTEGER,
      completion_tokens INTEGER,
      reasoning_tokens INTEGER,
      date_iso TEXT
    );`);

    TheDB.exec(`CREATE TABLE IF NOT EXISTS chat_threads (
      id TEXT PRIMARY KEY,
      title TEXT
    );`);

    TheDB.exec(`CREATE TABLE IF NOT EXISTS users (
      id TEXT PRIMARY KEY,
      username TEXT
    );`);

    TheDB.exec(`CREATE TABLE IF NOT EXISTS chat_threads__chat_data_map (
      chat_thread_id TEXT,
      chat_data_id TEXT UNIQUE
    );`);

    TheDB.exec(`CREATE TABLE IF NOT EXISTS users__chat_threads_map (
      user_id TEXT,
      chat_thread_id TEXT UNIQUE
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