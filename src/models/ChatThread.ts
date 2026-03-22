export type ChatThread = {
  id: string, //uuid
  meatball_id?: string | null, //uuid
  name: string,
  model_name: string,
  created_timestamp: number, //in ms.
};