import dotenv from "dotenv";
import Database from "better-sqlite3"

dotenv.config();

if (!process.env.DATABASE_NAME) {
  console.error("No DATABASE_NAME set!");
  process.exit();
}

const TheDb = new Database(process.env.DATABASE_NAME);

/**
 * Creates the entire initial database and its tables.
 */
function init() {
  console.log("Creating the database.");
  try {
    const createChats = TheDb.prepare(`CREATE TABLE IF NOT EXISTS chats (
      id TEXT PRIMARY KEY NOT NULL,
      thread_id TEXT NOT NULL,
      message TEXT NOT NULL,
      role TEXT NOT NULL,
      created_timestamp INTEGER NOT NULL,
      FOREIGN KEY(thread_id) REFERENCES chat_threads(id));`);

    const createChatThreads = TheDb.prepare(`CREATE TABLE IF NOT EXISTS chat_threads (
      id TEXT PRIMARY KEY NOT NULL,
      name TEXT NOT NULL,
      created_timestamp INTEGER NOT NULL);`);

    const createChatsDatas = TheDb.prepare(`CREATE TABLE IF NOT EXISTS llm_datas (
      id TEXT PRIMARY KEY NOT NULL,
      model TEXT NOT NULL,
      input_tokens INTEGER NOT NULL,
      output_tokens INTEGER NOT NULL,
      reasoning_tokens INTEGER NOT NULL,
      total_tokens INTEGER NOT NULL,
      created_timestamp INTEGER NOT NULL);`);

    const createMigrations = TheDb.prepare(`CREATE TABLE IF NOT EXISTS migrations(
      id TEXT PRIMARY KEY,
      version_number TEXT NOT NULL,
      created_timestamp INTEGER NOT NULL);`);

    const create = TheDb.transaction(() => {

      console.log("Creating chat_threads table");
      createChatThreads.run();

      console.log("Creating chats table");
      createChats.run();

      console.log("Creating llm_datas table");
      createChatsDatas.run();

      console.log("Creating migrations table");
      createMigrations.run();
    });

    create();
  }
  catch (error: any) {
    console.error(`There was an error creating the database ${error.message}`);
    return;
  }

  console.log("Finished creating the database.");
}

init();