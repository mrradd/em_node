import { ChatThread } from "../models/ChatThread";
import { TheDb } from "../Server";

function createChatThread(threadName: string): ChatThread | null {
  const insertStmt = TheDb.prepare(`
INSERT INTO chat_threads (id, name, created_timestamp)
VALUES(@id , @name, @created_timestamp);`);

  const newThread: ChatThread = {
    id: crypto.randomUUID(),
    name: threadName,
    created_timestamp: Date.now(),
  };

  const txn = TheDb.transaction((theThread: ChatThread) => {
    insertStmt.run(theThread);
  });

  txn(newThread);

  return newThread;
}

export const ChatThreadDBA = {
  createChatThread
};