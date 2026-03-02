export type ChatResponseDTO = {
  id: string, //uuid
  threadId: string, //uuid
  message: string,
  role: string,
  createdTimestamp: number
};