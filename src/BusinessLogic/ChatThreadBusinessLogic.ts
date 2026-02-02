import { ChatThread } from "../models/ChatThread";
import { ChatThreadDTO } from "../DTOs/ChatThreadDTO";
import { ChatThreadDBA } from "../DBAs/ChatThreadDBA";
import { CreateChatThreadRequestDTO } from "../DTOs/CreateChatThreadRequestDTO";
import { UpdateChatThreadRequestDTO } from "../DTOs/UpdateChatThreadRequestDTO";
import { UpdateChatThreadResponseDTO } from "../DTOs/UpdateChatThreadResponseDTO";
import { GetAllChatThreadsResponseDTO } from "../DTOs/GetAllChatThreadsResponseDTO";
import { ChatDBA } from "../DBAs/ChatDBA";
import { Chat } from "../models/Chat";
import { ChatThreadDetailDTO } from "../DTOs/ChatThreadDetailDTO";
import { ChatDTO } from "../DTOs/ChatDTO";

export class ChatThreadBusinessLogic {
  static createNewChatThread({ threadName }: CreateChatThreadRequestDTO): ChatThreadDTO {
    const resp: ChatThread | null = ChatThreadDBA.createChatThread(threadName);

    if (!resp) {
      throw new Error("createNewChatThread: An error occured creating the ChatThread");
    }

    return {
      id: resp.id,
      name: resp.name,
      created_timestamp: resp.created_timestamp,
    } as ChatThreadDTO
  }

  static getAllChatThreads(): GetAllChatThreadsResponseDTO {
    const threads: ChatThreadDTO[] = ChatThreadDBA.getAllChatThreads().map((chatThread) => {
      return {
        id: chatThread.id,
        name: chatThread.name,
        created_timestamp: chatThread.created_timestamp,
      } as ChatThreadDTO;
    });

    const dto: GetAllChatThreadsResponseDTO = {
      chatThreads: threads,
    }

    return dto;
  }

  static getChatThreadDetails(threadId: string) {
    const thread: ChatThread = ChatThreadDBA.getChatThreadById(threadId);
    const chats: Chat[] | null = ChatDBA.getChatsInThread(threadId);
    const chatDtos = chats?.map((chat) => {
      return {
        id: chat.id,
        threadId: chat.thread_id,
        role: chat.role,
        message: chat.message,
        createdTimestamp: chat.created_timestamp,
      } as ChatDTO
    });
    console.log(thread);
    return {
      id: thread.id,
      name: thread.name,
      created_timestamp: thread.created_timestamp,
      chats: chatDtos,
    } as ChatThreadDetailDTO
  }

  static updateChatThread(dto: UpdateChatThreadRequestDTO): UpdateChatThreadResponseDTO {
    const resp: Partial<ChatThread> = ChatThreadDBA.updateChatThread(dto);

    if (!resp) {
      throw new Error("createNewChatThread: An error occured creating the ChatThread");
    }

    return {
      id: resp.id,
      name: resp.name,
    } as UpdateChatThreadResponseDTO;
  }
}