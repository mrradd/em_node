import sqlite from "node:sqlite";
export const TheDB = new sqlite.DatabaseSync("electric_meatball.db");