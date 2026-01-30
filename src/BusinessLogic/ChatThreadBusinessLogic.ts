import { ChatThread } from "../models/ChatThread";
import { ChatThreadLiteDTO } from "../DTOs/ChatThreadLiteDTO";
import { ChatThreadDBA } from "../DBAs/ChatThreadDBA";
import { CreateChatThreadRequestDTO } from "../DTOs/CreateChatThreadRequestDTO";

/**
 * 
 * @param threadName 
 * @returns 
 */
export function createNewChatThread({ threadName }: CreateChatThreadRequestDTO): ChatThreadLiteDTO {
  const resp: ChatThread | null = ChatThreadDBA.createChatThread(threadName);

  if(!resp) {
    throw new Error("createNewChatThread: An error occured creating the ChatThread");
  }

  return {
    id: resp.id,
    name: resp.name,
    created_timestamp: resp.created_timestamp,
  } as ChatThreadLiteDTO
}

export const ChatThreadBusinessLogic = {
  createNewChatThread,
};