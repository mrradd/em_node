import { TheDB } from "./db.js";

export const initDb = () => {
  try {
    console.log("Initializing the DB...");
    //TODO CH  DO SOME DB SETUP STUFF HERE.
    console.log("Finished initializing the DB.");
  }
  catch (error) {
    console.log(`ERROR initDb: ${error.message}`);
  }
  finally {
    console.log("Exiting.");
    process.exit(0);
  }
}

initDb();