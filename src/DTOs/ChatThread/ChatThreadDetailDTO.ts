import { ChatDTO } from "../Chat/ChatDTO"

export type ChatThreadDetailDTO = {
  id: string, //uuid
  meatballId: string, //uuid
  name: string,
  createdTimestamp: number, //in ms.
  modelName: string,
  chats: ChatDTO[],
}