export type ExecutableMigration = {
  id: string; //Name of the migration
  up: string; //SQL statements for implementing the migration.
  down: string; //SQL statements for undoing the migration.
  checkSum: string; //hash of up + down in sha256.
};