import express from "express";
import dotenv from "dotenv";
import cors from "cors";

dotenv.config();

const Database = require('better-sqlite3');
export const TheDb = new Database(process.env.DATABASE_NAME);

const PORT = Number(process.env.PORT || 3000);
const HOST = process.env.HOST || "localhost";

const app = express();

app.use(cors());
app.use(express.json());

app.get("/api/v1/heartbeat", (req, res) => {
    res.json({ data: "42" });
});

const server = app.listen(PORT, HOST, () => {
    console.log(`Server is running on port ${PORT}`);
});

server.on("error", (err) => {
    console.error("Server error:", err.message);
});