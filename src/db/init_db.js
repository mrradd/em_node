import { TheDB } from "./db.js";

export const initDb = () => {
  try {
    console.log("Initializing the DB...");
    TheDB.exec("BEGIN");

    //TODO CH  ADD ABILITY TO HASH PASSWORDS TO SECURE ACCOUNTS LATER. NOT A BIG DEAL AS THIS IS JUST FOR MYSELF RIGHT NOW.
    TheDB.exec(`CREATE TABLE IF NOT EXISTS users(
      id TEXT PRIMARY KEY, --UUID
      username TEXT,
      --hashed_password TEXT,
      --salt TEXT,
      date_created TEXT
    );`);
    
    //Create a temporary user for testing purposes.
    TheDB.exec(`INSERT INTO users (id, username, date_created)
      VALUES('10000000-0000-0000-0000-000000000000','testuser', date()
    );`);

    TheDB.exec(`CREATE TABLE IF NOT EXISTS chat_group(
      id TEXT PRIMARY KEY, --UUID
      user_id TEXT, --UUID,
      display_name TEXT,
      date_created TEXT,
      FOREIGN KEY(user_id) REFERENCES users(id)
    );`);

    TheDB.exec(`CREATE TABLE IF NOT EXISTS chat_data(
      id TEXT PRIMARY KEY, --UUID
      user_id TEXT, --UUID,
      chat_group_id, --UUID
      response_id TEXT,
      chat_id TEXT, --From ChatGPT
      prompt TEXT,
      response TEXT,
      prompt_char_count INTEGER,
      response_char_count INTEGER,
      prompt_tokens INTEGER,
      completion_tokens INTEGER,
      reasoning_tokens INTEGER,
      date TEXT,
      FOREIGN KEY(user_id) REFERENCES users(id),
      FOREIGN KEY(chat_group_id) REFERENCES chat_group(id)
    );`);

    TheDB.exec(`CREATE TABLE IF NOT EXISTS memories(
      id TEXT PRIMARY KEY, --UUID
      user_id TEXT, --UUID
      description TEXT,
      date_created TEXT,
      FOREIGN KEY(user_id) REFERENCES users(id)
    );`);

    TheDB.exec(`CREATE TABLE IF NOT EXISTS versions(
      id TEXT PRIMARY KEY,
      version_number INTEGER,
      date_updated TEXT
    );`);

    TheDB.exec(`CREATE TABLE IF NOT EXISTS gpt_models(
      id TEXT PRIMARY KEY, --UUID
      name TEXT
    );`);

    TheDB.exec(`INSERT INTO gpt_models (id, name)
      VALUES('20000000-0000-0000-0000-000000000000', 'gpt-4o-mini'
    );`);

    TheDB.exec(`INSERT INTO gpt_models (id, name)
      VALUES('30000000-0000-0000-0000-000000000000', 'dall-e-3'
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