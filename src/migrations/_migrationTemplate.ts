import { sha256 } from "../utils/Hash";

const id = "YYYYMMDDHHMM_name";

const up = `
do stuff sql;
`;

const down = `
undo stuff sql;
`;

const checkSum = sha256(up + down);

const migYYYYMMDDHHMM_name = {
  id: id,
  up: up,
  down: down,
  checkSum: checkSum
};

export default migYYYYMMDDHHMM_name;