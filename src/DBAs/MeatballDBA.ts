import Database from "better-sqlite3";
import { Meatball } from "../models/Meatball";
import { TheDb } from "../Server";
require("crypto");

/**
 * A meatball is a concept kind of like an AI assistant at the most basic level. It is similar
 * in nature to Google's Gems or ChatGPT's custom GPTs. It accepts instructions that will always
 * be included in the system content. There are future plans to allow for tuning attributes,
 * providing files for it to read and access, as well as maintaining memory.
 */
export class MeatballDBA {
  static createMeatball(name: string, instructions: string, description: string): Meatball | null {
    const insertStmt = TheDb.prepare(`
INSERT INTO meatballs (id, name, description, instructions, created_timestamp)
VALUES(@id, @name, @description, @instructions, @created_timestamp);`);

    const newMeatball: Meatball = {
      id: crypto.randomUUID(),
      name: name,
      description: description,
      instructions: instructions,
      created_timestamp: Date.now(),
    };

    let info: Database.RunResult;
    const txn = TheDb.transaction((theThread: Meatball) => {
      info = insertStmt.run(theThread);
    });

    txn(newMeatball);

    if (info!.changes !== 1) {
      return null;
    }

    return newMeatball;
  }

  static deleteMeatball(id: string): boolean {
    const deleteStmt = TheDb.prepare(`
DELETE FROM meatballs WHERE id = @id;`);

    const deleteFkStmt = TheDb.prepare(`
UPDATE chat_threads SET meatball_id = null WHERE meatball_id = @id;`);

    let info: Database.RunResult;
    const txn = TheDb.transaction((meatballId: string) => {
      deleteFkStmt.run({ id: meatballId });
      info = deleteStmt.run({ id: meatballId });
    });

    txn(id);

    return info!.changes === 1
  }

  static updateMeatball({ id, name, instructions, description }: Partial<Meatball>): Partial<Meatball> | null {
    const updateNameStmt = TheDb.prepare(`
UPDATE meatballs
   SET name = @name
 WHERE id = @id;`);
    const updateDescriptionStmt = TheDb.prepare(`
UPDATE meatballs
   SET description = @description
 WHERE id = @id;`);
    const updateInstructionsStmt = TheDb.prepare(`
UPDATE meatballs
   SET instructions = @instructions
 WHERE id = @id;`);

    const editedMeatball: Partial<Meatball> = {
      id: id,
      name: name,
      instructions: instructions,
      description: description,
    };

    let rowsChanged: number = 0;
    const txn = TheDb.transaction((meatball: Partial<Meatball>) => {
      if (meatball.name) {
        rowsChanged += updateNameStmt.run({ id: meatball.id, name: meatball.name }).changes;
      }
      if (meatball.description) {
        rowsChanged += updateDescriptionStmt.run({ id: meatball.id, description: meatball.description }).changes
      }
      if (meatball.instructions) {
        rowsChanged += updateInstructionsStmt.run({ id: meatball.id, instructions: meatball.instructions }).changes;
      }
    });

    txn(editedMeatball);

    return rowsChanged > 0 ? editedMeatball : null;
  }

  static getMeatballById(id: string): Meatball | null {
    const selectStmt = TheDb.prepare(`SELECT * FROM meatballs WHERE id = @id;`);
    return selectStmt.get({ id: id }) as Meatball | null
  }

  static getMeatballs(): Meatball[] | null {
    const selectStmt = TheDb.prepare(`SELECT id, name FROM meatballs;`);
    return selectStmt.all() as Meatball[] | null;
  }
}