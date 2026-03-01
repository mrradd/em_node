import Database from "better-sqlite3";
import type { Database as DatabaseType } from "better-sqlite3";
import { DATABASE_NAME } from "../EMConfig";
import migrationsList from "../migrations/migrationList";
import { ExecutableMigration } from "../models/ExecutableMigration";

if (!DATABASE_NAME) {
  console.error("No DATABASE_NAME set!");
  process.exit(1);
}

const TheDb = new Database(DATABASE_NAME) as DatabaseType;

//Verifies that the migrations table exists by querying it.
function checkForMigrationsTable() {
  console.log("Checking for migrations table.");
  TheDb.prepare(`SELECT * FROM migrations LIMIT 1;`).run();
}

//Iterates over the migrations list and applies any that have not yet been applied.
function runMigrations() {
  checkForMigrationsTable();

  const migrationExists = TheDb.prepare(
    `SELECT 1 FROM migrations WHERE id = ? LIMIT 1;`
  );

  const logMigration = TheDb.prepare(
    `INSERT INTO migrations (id, checksum, time_elapsed, created_timestamp)
     VALUES (?, ?, ?, ?);`
  );

  //Run the passed in migration.
  const applyMigration = TheDb.transaction((migration: ExecutableMigration) => {
    const start = Date.now();

    //Run the migration.
    TheDb.exec(migration.up);

    const elapsed = Date.now() - start;

    //Log the migration.
    logMigration.run(
      migration.id,
      migration.checkSum,
      elapsed,
      Date.now(),
    );

    return elapsed;
  });

  //Check to see if we can run migrations.
  for (const migration of migrationsList) {
    const exists = migrationExists.get(migration.id);
    if (exists) {
      console.log(`Skipping already-applied migration ${migration.id}.`);
      continue;
    }

    const elapsed = applyMigration(migration);
    console.log(`Applied migration ${migration.id} in ${elapsed}ms.`);
  }
}

try {
  runMigrations();
  console.log("Migrations complete.");
} catch (error: any) {
  console.error(`Migration failed: ${error.message ?? error}`);
  process.exit(1);
}
