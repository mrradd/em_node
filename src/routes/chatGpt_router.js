import { Router } from "express";
import OpenAI from 'openai';
import DotenvFlow from "dotenv-flow";

DotenvFlow.config();

const client = new OpenAI({apiKey: process.env.OPEN_AI_KEY || ""});
const chatGptRouter = Router();

chatGptRouter.post('/chat', async (req, res) => {
  const completion = await client.chat.completions.create({
    model: process.env.CHAT_GPT_MODEL || "",
    messages: [
      {
        role: "user",
        content: req.body.requestText,
      },
    ],
  });
  const resp = completion.choices[0].message.content;
  res.status(200).json({response: resp});
});

chatGptRouter.get('/test_chat', async (req, res) => {
  const completion = await client.chat.completions.create({
    model: process.env.CHAT_GPT_MODEL || "",
    messages: [
      {
        role: "user",
        content: "2 + 10 = ?",
      },
    ],
  });
  const resp = completion.choices[0].message.content;
  res.status(200).json({response: resp});
});

export default chatGptRouter;