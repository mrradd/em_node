export type ChatThread = {
  id: string, //uuid
  meatball_id?: string | null, //uuid
  name: string,
  created_timestamp: number, //in ms.
};