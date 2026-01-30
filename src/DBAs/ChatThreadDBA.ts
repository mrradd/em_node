import { ChatThread } from "../models/ChatThread";
import { TheDb } from "../Server";

async function createChatThread(threadName: string): Promise<ChatThread | null> {
  try{
    const insertQuery = `
INSERT INTO chat_threads (id, name, created_timestamp)
VALUES($id, $name, $created_timestamp);`;
    
    const newThread: ChatThread = {
      id: crypto.randomUUID(),
      name: threadName,
      created_timestamp: Date.now(),
    };

    await TheDb.run("BEGIN TRANSACTION;");
    
    await TheDb.run(insertQuery, {
        $id: newThread.id,
        $name: newThread.name,
        $created_timestamp: newThread.created_timestamp,
      }
    );

    await TheDb.run("COMMIT;")

    return newThread;
  }
  catch (err:any){
    await TheDb.run("ROLLBACK;");
    return null;
  }
}

export const ChatThreadDBA = {
createChatThread
};