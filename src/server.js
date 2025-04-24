import express from "express";
import DotenvFlow from "dotenv-flow";
import bodyParser from "body-parser";
import path from 'path';
import { fileURLToPath } from 'url';
import chatGptRouter from './routes/chatGpt_router.js';

DotenvFlow.config();

const __filename = fileURLToPath(import.meta.url); // get the resolved path to the file
const __dirname = path.dirname(__filename); // get the name of the directory

const app = express();
const port = process.env.PORT || 3042;

app.use(bodyParser.json());

app.use('/', express.static(path.join(__dirname, '../public')));
app.use('/pages', express.static(path.join(__dirname, '../public/pages')));

app.use('/api/llm', chatGptRouter);

app.get('/heartbeat', (req, res) => {
  const date = new Date().toUTCString();
  console.log(`42: ${date}`);
  res.status(200).json({now: date});
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});