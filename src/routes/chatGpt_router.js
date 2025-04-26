import { Router } from "express";
import OpenAI from 'openai';
import DotenvFlow from "dotenv-flow";
import { ChatDataModel } from "../db/models.js";
import { saveChatData } from "../db/db.js";

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

  const chatData = new ChatDataModel();
  chatData.chat_id = completion.id;
  chatData.prompt = req.body.requestText;
  chatData.response = completion.choices[0].message.content;
  chatData.prompt_tokens = completion.usage?.prompt_tokens || 0;
  chatData.completion_tokens = completion.usage?.completion_tokens || 0;
  chatData.reasoning_tokens = completion.usage?.completion_tokens_details?.reasoning_tokens || 0;
  chatData.response_id = "n/a";

  saveChatData(chatData);

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