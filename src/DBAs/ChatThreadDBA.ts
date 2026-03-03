import { UpdateChatThreadRequestDTO } from "../DTOs/ChatThread/UpdateChatThreadRequestDTO";
import { ChatThread } from "../models/ChatThread";
import { TheDb } from "../Server";
require("crypto");

//TODO CH. RETURN NULL IN BAD CASE FOR CONSISTENCY.

export class ChatThreadDBA {
  static createChatThread(threadName: string): ChatThread {
    const insertStmt = TheDb.prepare(`
INSERT INTO chat_threads (id, name, created_timestamp)
VALUES (@id , @name, @created_timestamp);`);

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

  static deleteChatThread(id: string) {
    const threadDeleteStmt = TheDb.prepare(`DELETE FROM chat_threads WHERE id = @id`);
    const chatDeleteStmt = TheDb.prepare(`DELETE FROM chats WHERE thread_id = @threadId;`);

    const txn = TheDb.transaction((id: string) => {
      chatDeleteStmt.run({ threadId: id });
      threadDeleteStmt.run({ id: id });
    });

    txn(id);
  }

  static getAllChatThreads(): ChatThread[] {
    const selectStmt = TheDb.prepare(`SELECT id, name, created_timestamp FROM chat_threads;`);
    const res = selectStmt.all() as ChatThread[];
    return res;
  }

  static getChatThreadById(id: string): ChatThread {
    const selectStmt = TheDb.prepare(`
SELECT id, name, created_timestamp
  FROM chat_threads
 WHERE id = @id;`);

    return selectStmt.get({ id: id }) as ChatThread;
  }

  /** @returns an object only containing changed values. */
  static updateChatThread({ id, newThreadName }: UpdateChatThreadRequestDTO): Partial<ChatThread> {
    const updateNameStmt = TheDb.prepare(`
UPDATE chat_threads
   SET name = @name
 WHERE id = @id;`);

    const editedThread: Partial<ChatThread> = {
      id: id,
      name: newThreadName,
    };

    const txn = TheDb.transaction((theThread: Partial<ChatThread>) => {
      if (theThread.name) {
        updateNameStmt.run({ id: theThread.id, name: theThread.name });
      }
    });

    txn(editedThread);

    return editedThread;
  }
}
