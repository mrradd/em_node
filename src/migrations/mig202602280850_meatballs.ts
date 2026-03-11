import { ExecutableMigration, generateChecksum } from "../models/ExecutableMigration";

const id = "202602280850_meatballs";

//First, compile all the statements to use.
const up = `
CREATE TABLE IF NOT EXISTS meatballs (
  id TEXT PRIMARY KEY NOT NULL,
  name TEXT NOT NULL,
  description TEXT,
  instructions TEXT,
  created_timestamp TEXT NOT NULL,
  edited_timestamp TEXT);
  
ALTER TABLE chat_threads ADD COLUMN meatball_id TEXT REFERENCES meatballs(id);
`;

const down = `
ALTER TABLE chat_threads DROP COLUMN meatball_id;
DROP TABLE IF EXISTS meatballs;
`;

const mig202602280850_meatballs: ExecutableMigration = {
  id: id,
  up: up,
  down: down,
  checkSum: generateChecksum(up, down),
};

export default mig202602280850_meatballs;