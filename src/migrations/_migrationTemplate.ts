import { generateChecksum } from "../models/ExecutableMigration";

const id = "YYYYMMDDHHMM_name";

const up = `
do stuff sql;
`;

const down = `
undo stuff sql;
`;

const migYYYYMMDDHHMM_name = {
  id: id,
  up: up,
  down: down,
  checkSum: generateChecksum(up, down),
};

export default migYYYYMMDDHHMM_name;