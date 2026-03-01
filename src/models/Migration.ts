export type Migration = {
  id: string, //name of the migration
  checksum: string, //sha256 hash
  time_elapsed: number, //mili seconds
  created_timestamp: number, //in ms.
};