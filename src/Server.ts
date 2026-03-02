import express from "express";
import cors from "cors";
import { chatRouter } from "./routes/ChatRouter";
import { DATABASE_NAME, HOST, OPENAI_API_KEY, PORT, validateSettings } from "./EMConfig";
import { meatballRouter } from "./routes/MeatballRouter";
import OpenAI from "openai";

validateSettings();

const Database = require("better-sqlite3");
export const TheDb = new Database(DATABASE_NAME);
export const openaiClient = new OpenAI({
  apiKey: OPENAI_API_KEY
});

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/v1/chat", chatRouter);
app.use("/api/v1/meatball", meatballRouter);

app.get("/api/v1/heartbeat", (req, res) => {
  res.json({ data: "42" });
});

// A general error handling middleware.
app.use((err: any, req: any, res: any, next: any) => {
  console.error(err.stack);
  res.status(500).json({
    code: "INTERNAL_SERVER_ERROR",
    message: "Something went wrong on the server."
  });
});

const server = app.listen(PORT, HOST, () => {
  console.log(`\nRunning... Host: ${HOST} | Port: ${PORT}`);
});