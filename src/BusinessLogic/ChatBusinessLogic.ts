import OpenAI from "openai";
import { Chat } from "../models/Chat";
import { MODEL, OPENAI_API_KEY } from "../EMConfig";

const openaiClient = new OpenAI({
    apiKey: OPENAI_API_KEY
  }
);

export async function sendChatRequest(message: string, threadId: string): Promise<string | null> {
  const completion = await openaiClient.chat.completions.create({
    model: MODEL,
    messages: [
      {role: "user", content: message}
    ]
  });
  console.log(completion.choices[0].message.content);
  return completion.choices[0].message.content;
}