import { ChatThread } from "../models/ChatThread";
import { TheDb } from "../Server";

/**
 * 
 * @param threadName 
 * @returns 
 */
function createChatThread(threadName: string): ChatThread | null {
  try{
    const insertStmt = TheDb.prepare(`
INSERT INTO chat_threads (id, name, created_timestamp)
VALUES(@id , @name, @created_timestamp);`);
    
    const newThread: ChatThread = {
      id: crypto.randomUUID(),
      name: threadName,
      created_timestamp: Date.now(),
    };
    
    const insert = TheDb.transaction((theThread: ChatThread) => {
      insertStmt.run(theThread);
    });

    insert(newThread);

    return newThread;
  }
  catch (err:any){
    throw err;
  }
}

export const ChatThreadDBA = {
  createChatThread
};