export type Chat = {
  id: string, //uuid
  thread_id: string, //uuid
  message: string,
  role: string, //system | user | assistant
  created_timestamp: number, //in ms.
};