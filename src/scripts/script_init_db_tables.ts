import dotenv from "dotenv";
import Database from "better-sqlite3"
dotenv.config();

const TheDb = new Database(process.env.DATABASE_NAME);

/**
 * Creates the entire initial database and its tables.
 */
function init() {
    console.log("Creating the database.");
    try {
        const createChats = TheDb.prepare(`CREATE TABLE IF NOT EXISTS chats (
            id TEXT PRIMARY KEY NOT NULL,
            message TEXT NOT NULL,
            role TEXT NOT NULL,
            created_date TEXT NOT NULL);`);

        const createChatThreads = TheDb.prepare(`CREATE TABLE IF NOT EXISTS chat_threads (
            id TEXT PRIMARY KEY NOT NULL,
            name TEXT NOT NULL,
            created_date TEXT NOT NULL);`);

        const createChatsDatas = TheDb.prepare(`CREATE TABLE IF NOT EXISTS chat_datas (
            id TEXT PRIMARY KEY NOT NULL,
            model TEXT NOT NULL,
            tokens INTEGER NOT NULL,
            created_date TEXT NOT NULL);`);

        const createChatThreadsChatsMap = TheDb.prepare(`CREATE TABLE IF NOT EXISTS chat_threads__chats_map (
            thread_id TEXT NOT NULL,
            chat_id TEXT NOT NULL,
            PRIMARY KEY (thread_id, chat_id),
            FOREIGN KEY(chat_id) REFERENCES chats(id),
            FOREIGN KEY(thread_id) REFERENCES chat_threads(id));`);

        const createChatsChatDatasMap = TheDb.prepare(`CREATE TABLE IF NOT EXISTS chats__chat_datas_map (
            chat_id TEXT NOT NULL,
            chat_data_id TEXT NOT NULL,
            PRIMARY KEY (chat_data_id, chat_id),
            FOREIGN KEY(chat_id) REFERENCES chats(id),
            FOREIGN KEY(chat_data_id) REFERENCES chat_datas(id));`);

        const createMigrations = TheDb.prepare(`CREATE TABLE IF NOT EXISTS migrations(
            id TEXT PRIMARY KEY,
            date TEXT NOT NULL,
            version_number TEXT NOT NULL);`);

        const create = TheDb.transaction(() => {
            createChats.run();
            createChatThreads.run();
            createChatsDatas.run();
            createChatThreadsChatsMap.run();
            createChatsChatDatasMap.run();
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