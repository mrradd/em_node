import { Chat } from "../models/Chat";
import { TheDb } from "../Server";

export class ChatDBA {
  static deleteChatByThreadId(threadId: string) {
    const deleteStmt = TheDb.prepare(`DELETE FROM chats WHERE thread_id = @threadId;`);
    const txn = TheDb.transaction((threadId: string) => {
      deleteStmt.run({ threadId: threadId });
    });

    txn(threadId);
  }

  static getChatsInThread(threadId: string): Chat[] | null {
    const selectStmt = TheDb.prepare(`
  SELECT c.id, c.thread_id, c.role, c.message, c.created_timestamp
    FROM chats c
  WHERE c.thread_id = ?`);

    const result = selectStmt.all(threadId);

    return result;
  }

  static saveChat({ message, role, thread_id }: Chat): Chat {
    const insertStmt = TheDb.prepare(`
  INSERT INTO chats (id, thread_id, message, role, created_timestamp)
  VALUES(@id, @thread_id, @message, @role, @created_timestamp);`);

    const newChat: Chat = {
      id: crypto.randomUUID(),
      thread_id: thread_id,
      message: message,
      role: role,
      created_timestamp: Date.now(),
    };

    const txn = TheDb.transaction((theThread: Chat) => {
      insertStmt.run(theThread);
    });

    txn(newChat);

    return newChat;
  }
}