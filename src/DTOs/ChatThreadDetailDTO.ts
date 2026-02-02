import { ChatDTO } from "./ChatDTO"
import { ChatThreadDTO } from "./ChatThreadDTO"

export type ChatThreadDetailDTO = {
  id: string, //uuid
  name: string,
  created_timestamp: number, //in ms.
  chats: ChatDTO[],
}