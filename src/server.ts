import OpenAI from 'openai';
import express, { Express, Request, Response } from "express";
import DotenvFlow from "dotenv-flow";

DotenvFlow.config();
const app = express();
const port = process.env.PORT || 3000;
const client = new OpenAI({apiKey: process.env.OPEN_AI_KEY || ""});

app.get('/test_chat', async (req, res) => {
  const completion = await client.chat.completions.create({
    model: process.env.CHAT_GPT_MODEL || "",
    messages: [
      {
        role: "user",
        content: "2 + 10 = ?",
      },
    ],
  });
  const resp: any = completion.choices[0].message.content;
  res.status(200).json({response: resp});
});

app.get('/yay', (req, res) => {
  res.status(200).json({herp: "derp"});
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});