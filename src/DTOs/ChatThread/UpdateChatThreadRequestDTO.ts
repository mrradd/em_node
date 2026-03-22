export type UpdateChatThreadRequestDTO = {
  id: string, //uuid
  newMeatballId?: string, //uuid
  modelName: string,
  newThreadName?: string,
};