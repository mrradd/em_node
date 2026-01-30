import OpenAI from "openai";
import { Chat } from "../models/Chat";
import { MODEL, OPENAI_API_KEY } from "../EMConfig";

const openaiClient = new OpenAI({
    apiKey: OPENAI_API_KEY
  }
);

export async function sendChatRequest(message: string, threadId: string): Promise<string | null> {

  //todo ch  compile a list of chats/responses from thread to send to completion api.

  const completion = await openaiClient.chat.completions.create({
    model: MODEL,
    messages: [
      {role: "user", content: message}
    ]
  });

  //todo ch save user's passed in message.
  //todo ch save response message.
  //todo ch save response data.
  //todo ch create response object.
  return completion.choices[0].message.content;
}