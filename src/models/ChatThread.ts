import { Chat } from "./Chat";

export type ChatThread = {
  id: string, //uuid
  name: string,
  created_timestamp: number, //in ms.

  //Navigation props.
  chats?: Chat[],
};