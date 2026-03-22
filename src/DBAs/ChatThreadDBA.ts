import { UpdateChatThreadRequestDTO } from "../DTOs/ChatThread/UpdateChatThreadRequestDTO";
import { ChatThread } from "../models/ChatThread";
import { TheDb } from "../Server";
require("crypto");

//TODO CH. RETURN NULL IN BAD CASE FOR CONSISTENCY.

export class ChatThreadDBA {
  static createChatThread(threadName: string, modelName: string): ChatThread {
    const insertStmt = TheDb.prepare(`
INSERT INTO chat_threads (id, name, model_name, created_timestamp)
VALUES (@id , @name, @model_name, @created_timestamp);`);

    const newThread: ChatThread = {
      id: crypto.randomUUID(),
      name: threadName,
      model_name: modelName,
      meatball_id: "",
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
    const selectStmt = TheDb.prepare(`SELECT id, meatball_id, name, model_name, created_timestamp FROM chat_threads;`);
    const res = selectStmt.all() as ChatThread[];
    return res;
  }

  static getChatThreadById(id: string): ChatThread {
    const selectStmt = TheDb.prepare(`
SELECT id, meatball_id, model_name, name, created_timestamp
  FROM chat_threads
 WHERE id = @id;`);

    return selectStmt.get({ id: id }) as ChatThread;
  }

  static updateChatThread({ id, newThreadName, newMeatballId, modelName }: UpdateChatThreadRequestDTO): Partial<ChatThread> | null {
    const updateStmt = TheDb.prepare(`
UPDATE chat_threads
   SET name = @name, meatball_id = @meatball_id, model_name = @model_name
 WHERE id = @id;`);

    const editedThread: Partial<ChatThread> = {
      id: id,
      name: newThreadName,
      meatball_id: newMeatballId || null,
      model_name: modelName,
    };

    let rowsChanged: number = 0;
    const txn = TheDb.transaction((theThread: Partial<ChatThread>) => {
      rowsChanged += updateStmt.run({
        id: theThread.id,
        name: theThread.name,
        meatball_id: theThread.meatball_id,
        model_name: theThread.model_name,
      }).changes;
    });

    txn(editedThread);

    return rowsChanged > 0 ? editedThread : null;
  }
}
