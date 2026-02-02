import { UpdateChatThreadRequestDTO } from "../DTOs/UpdateChatThreadRequestDTO";
import { ChatThread } from "../models/ChatThread";
import { TheDb } from "../Server";

export class ChatThreadDBA {

  static createChatThread(threadName: string): ChatThread | null {
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

  /** @returns an object only containing changed values. */
  static updateChatThread({ id, newThreadName }: UpdateChatThreadRequestDTO): Partial<ChatThread> {
    const updateNameStmt = TheDb.prepare(`
  UPDATE chat_threads
    SET name = @name
  WHERE id = @id;`);

    const newThread: Partial<ChatThread> = {
      id: id,
      name: newThreadName,
    };

    const txn = TheDb.transaction((theThread: ChatThread) => {
      if (newThread.name) {
        updateNameStmt.run(theThread);
      }
    });

    txn(newThread);

    return newThread;
  }

  static getAllChatThreads(): ChatThread[] {
    const selectStmt = TheDb.prepare(`SELECT id, name, created_timestamp FROM chat_threads;`);
    const res = selectStmt.all()
    return res;
  }

  static getChatThreadById(id: string): ChatThread {
    const selectStmt = TheDb.prepare(`
  SELECT id, name, created_timestamp
    FROM chat_threads
  WHERE id = @id;`);

    return selectStmt.get({ id: id });
  }
}
