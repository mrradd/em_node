import { Router } from "express";
import { ChatBusinessLogic } from "../BusinessLogic/ChatBusinessLogic";
import { ChatThreadBusinessLogic } from "../BusinessLogic/ChatThreadBusinessLogic";
import { ChatRequestDTO } from "../DTOs/Chat/ChatRequestDTO";
import { CreateChatThreadRequestDTO } from "../DTOs/ChatThread/CreateChatThreadRequestDTO";
import { UpdateChatThreadRequestDTO } from "../DTOs/ChatThread/UpdateChatThreadRequestDTO";

export const chatRouter = Router();
//TODO CH. HANDLE NULLS WITH A BAD RESPONSE.

//POST
//api/v1/chat/send
//Sends a chat request to an LLM for a specific ChatThread for the given prompt and all the thread's related chats. 
chatRouter.post("/send", async (req, res) => {
  res.json({ data: await ChatBusinessLogic.sendChatRequest(req.body as ChatRequestDTO) });
});

//GET
//api/v1/chat/thread/all
//Returns all ChatThreads.
chatRouter.get("/thread/all", async (req, res) => {
  res.json({ data: ChatThreadBusinessLogic.getAllChatThreads() });
});

//DELETE
//api/v1/chat/thread/:id
//Deletes a ChatThread and all of its Chats with the given ID.
chatRouter.delete("/thread/:id", async (req, res) => {
  ChatThreadBusinessLogic.deleteChatThread(req.params.id);
  res.sendStatus(200);
});

//POST
//api/v1/chat/thread/create
//Creates a new ChatThread.
chatRouter.post("/thread/create", (req, res) => {
  res.json({ data: ChatThreadBusinessLogic.createNewChatThread(req.body as CreateChatThreadRequestDTO) });
});

//GET
//api/v1/chat/thread/:id/detail
//Gets all information for a ChatThread including all of its Chats.
chatRouter.get("/thread/:id/detail", async (req, res) => {
  res.json({ data: ChatThreadBusinessLogic.getChatThreadDetails(req.params.id) })
});

//PATCH
//api/v1/chat/thread/update
//Updates an existing ChatThread with the passed in information.
chatRouter.patch("/thread/update", async (req, res) => {
  res.json({ data: ChatThreadBusinessLogic.updateChatThread(req.body as UpdateChatThreadRequestDTO) })
});

//GET
//api/v1/chat/model/list
//Returns a list of compatible LLMs to use while chatting.
chatRouter.get("/model/list", async (req, res) => {
  res.json({
    data: {
      models: [
        "gpt-5.3-chat-latest",
        "gpt-5.3-codex",
        "gpt-5.4-2026-03-05",
        "gpt-5.4-mini-2026-03-17",
        "gpt-5.4-nano-2026-03-17",
        "gpt-5.4-pro-2026-03-05",
        "gpt-5.5-2026-04-23",
        "gpt-5.5-pro-2026-04-23",
      ]
    }
  })
});