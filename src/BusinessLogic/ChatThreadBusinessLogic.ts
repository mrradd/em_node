import { ChatThread } from "../models/ChatThread";
import { ChatThreadDTO } from "../DTOs/ChatThread/ChatThreadDTO";
import { ChatThreadDBA } from "../DBAs/ChatThreadDBA";
import { CreateChatThreadRequestDTO } from "../DTOs/ChatThread/CreateChatThreadRequestDTO";
import { UpdateChatThreadRequestDTO } from "../DTOs/ChatThread/UpdateChatThreadRequestDTO";
import { UpdateChatThreadResponseDTO } from "../DTOs/ChatThread/UpdateChatThreadResponseDTO";
import { GetAllChatThreadsResponseDTO } from "../DTOs/ChatThread/GetAllChatThreadsResponseDTO";
import { ChatDBA } from "../DBAs/ChatDBA";
import { Chat } from "../models/Chat";
import { ChatThreadDetailDTO } from "../DTOs/ChatThread/ChatThreadDetailDTO";
import { ChatDTO } from "../DTOs/Chat/ChatDTO";

//TODO CH. RETURN NULLS FOR FAILURES.
export class ChatThreadBusinessLogic {
  static createNewChatThread({ threadName }: CreateChatThreadRequestDTO): ChatThreadDTO {
    const resp: ChatThread = ChatThreadDBA.createChatThread(threadName);

    return {
      id: resp.id,
      name: resp.name,
      createdTimestamp: resp.created_timestamp,
    } as ChatThreadDTO
  }

  static deleteChatThread(id: string) {
    ChatThreadDBA.deleteChatThread(id);
  }

  static getAllChatThreads(): GetAllChatThreadsResponseDTO {
    const threads: ChatThreadDTO[] = ChatThreadDBA.getAllChatThreads().map((chatThread) => {
      return {
        id: chatThread.id,
        name: chatThread.name,
        createdTimestamp: chatThread.created_timestamp,
        meatballId: chatThread.meatball_id,
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

    return {
      id: thread?.id,
      name: thread?.name,
      createdTimestamp: thread?.created_timestamp,
      meatballId: thread?.meatball_id,
      chats: chatDtos,
    } as ChatThreadDetailDTO
  }

  static updateChatThread(dto: UpdateChatThreadRequestDTO): UpdateChatThreadResponseDTO {
    const resp: Partial<ChatThread> | null = ChatThreadDBA.updateChatThread(dto);

    return {
      id: resp?.id,
      name: resp?.name,
      meatballId: resp?.meatball_id,
    } as UpdateChatThreadResponseDTO;
  }
}