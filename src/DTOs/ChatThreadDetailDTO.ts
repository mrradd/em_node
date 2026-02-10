import { ChatDTO } from "./ChatDTO"

export type ChatThreadDetailDTO = {
  id: string, //uuid
  name: string,
  createdTimestamp: number, //in ms.
  chats: ChatDTO[],
}