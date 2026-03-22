import { sha256 } from "../utils/Hash";

export type ExecutableMigration = {
  id: string; //Name of the migration
  up: string; //SQL statements for implementing the migration.
  down: string; //SQL statements for undoing the migration.
  checkSum: string; //hash of up + down in sha256.
};

/**
 * Generates a SHA-256 checksum from the concatenated up and down SQL statements.
 *
 * @param sqlUp The SQL statements that apply the migration.
 * @param sqlDown The SQL statements that roll back the migration.
 * @returns The SHA-256 checksum for the migration contents.
 */
export const generateChecksum = (sqlUp: string, sqlDown: string) => {
  return sha256(sqlUp + sqlDown);
}
