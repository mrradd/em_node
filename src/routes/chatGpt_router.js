import { Router } from "express";
import OpenAI from 'openai';
import DotenvFlow from "dotenv-flow";
import { ChatDataModel } from "../db/models.js";
import { ChatDataService } from "../db/db.js";

DotenvFlow.config();

const client = new OpenAI({apiKey: process.env.OPEN_AI_KEY || ""});
const chatGptRouter = Router();

// Returns ALL the chat messages regardless of chat thread.
chatGptRouter.get('/all', async (req, res) => {
  try {
    const dbResult = ChatDataService.getAllChats();
    res.status(200).json({data: dbResult});
  }
  catch (error) {
    console.log(`ERROR: GET /api/llm/all: ${error.message}`);
    res.sendStatus(500);
  }
});

// Requests a one-off chat and saves it to the DB.
chatGptRouter.post('/chat', async (req, res) => {
  try {
    const completion = await client.chat.completions.create({
      model: process.env.CHAT_GPT_MODEL || "",
      messages: [
        {
          role: "user",
          content: req.body.requestText,
        },
      ],
    });

    const chatData = new ChatDataModel();
    chatData.chat_id = completion.id;
    chatData.prompt = req.body.requestText;
    chatData.response = completion.choices[0].message.content;
    chatData.prompt_tokens = completion.usage?.prompt_tokens || 0;
    chatData.completion_tokens = completion.usage?.completion_tokens || 0;
    chatData.reasoning_tokens = completion.usage?.completion_tokens_details?.reasoning_tokens || 0;
    chatData.response_id = "n/a";

    const result = ChatDataService.saveChatData(chatData);

    if (result) {
      res.status(201).json({ data: result });
    }
    else {
      res.sendStatus(400);
    }
  }
  catch (error){
    console.log(`ERROR: POST /api/llm/chat: ${error.message}`);
    res.sendStatus(500);
  }
});

export default chatGptRouter;