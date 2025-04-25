//This is where database migrations will go.
const updateDb = () => {
  try {
    console.log("Updating the DB...");
    //TODO CH  DO SOME DB SETUP STUFF HERE.
    console.log("Finished updating the DB.");
  }
  catch (error) {
    console.log(`ERROR updateDb: ${error.message}`);
  }
  finally {
    console.log("Exiting.");
    process.exit(0);
  }
}

updateDb();