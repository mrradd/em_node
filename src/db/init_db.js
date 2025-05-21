import { TheDB } from "./db.js";

export const initDb = () => {
  try {
    console.log("Initializing the DB...");
    TheDB.exec("BEGIN");

    TheDB.exec(`CREATE TABLE IF NOT EXISTS users(
      id TEXT PRIMARY KEY, --UUID
      username TEXT,
      password TEXT, --ENCRYPTED
      password_iv TEXT,
      date_created TEXT
    );`);

    //TODO CH  FK TO USERS
    TheDB.exec(`CREATE TABLE IF NOT EXISTS chat_data(
      id TEXT PRIMARY KEY, --UUID
      user_id TEXT, --UUID
      response_id TEXT,
      chat_id TEXT, --From ChatGPT
      prompt TEXT,
      response TEXT,
      prompt_char_count INTEGER,
      response_char_count INTEGER,
      prompt_tokens INTEGER,
      completion_tokens INTEGER,
      reasoning_tokens INTEGER,
      date TEXT
    );`);

    //TODO CH  FK TO USERS
    TheDB.exec(`CREATE TABLE IF NOT EXISTS memories(
      id TEXT PRIMARY KEY, --UUID
      user_id TEXT, --UUID
      description TEXT,
      date_created TEXT
    );`);

    //TODO CH  FK TO USERS AND CHAT_DATA
    TheDB.exec(`CREATE TABLE IF NOT EXISTS chats(
      id TEXT PRIMARY KEY, --UUID
      user_id TEXT, --UUID
      chat_data_id TEXT, --UUID
      display_name TEXT,
      date_created TEXT
    );`);

    TheDB.exec(`CREATE TABLE IF NOT EXISTS versions(
      id TEXT PRIMARY KEY,
      version_number INTEGER,
      date_updated TEXT
    );`);

    TheDB.exec(`CREATE TABLE IF NOT EXISTS gpt_models(
      id TEXT PRIMARY KEY,
      name TEXT
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