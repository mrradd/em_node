export type Meatball = {
  id: string, //uuid
  name: string,
  description: string,
  instructions: string,
  created_timestamp: number, //in ms.
  edited_timestamp?: number, //in ms.
}