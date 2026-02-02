import { Router } from "express";
import { ChatBusinessLogic } from "../BusinessLogic/ChatBusinessLogic";
import { ChatThreadBusinessLogic } from "../BusinessLogic/ChatThreadBusinessLogic";

export const chatRouter = Router();

//POST
//api/v1/chat/send
//Sends a chat request to an LLM for a specific ChatThread for the given prompt and all the thread's related chats. 
chatRouter.post("/send", async (req, res) => {
  res.json({ data: await ChatBusinessLogic.sendChatRequest(req.body) });
});

//POST
//api/v1/chat/thread/create
//Creates a new ChatThread.
chatRouter.post("/thread/create", (req, res) => {
  res.json({ data: ChatThreadBusinessLogic.createNewChatThread(req.body) });
});

//PATCH
//api/v1/chat/thread/update
//Updates an existing ChatThread with the passed in information.
chatRouter.patch("/thread/update", async (req, res) => {
  res.json({ data: ChatThreadBusinessLogic.updateChatThread(req.body) })
});

//GET
//api/v1/chat/thread/all
//Returns all ChatThreads.
chatRouter.get("/thread/all", async (req, res) => {
  res.json({ data: ChatThreadBusinessLogic.getAllChatThreads() });
});

//GET
//api/v1/chat/thread/:id/detail
//Gets all information for a ChatThread including all of its Chats.
chatRouter.get("/thread/:id/detail", async (req, res) => {
  res.json({ data: ChatThreadBusinessLogic.getChatThreadDetails(req.params.id) })
});

//DELETE
//api/v1/chat/thread/:id
//Deletes a ChatThread and all of its Chats with the given ID.
chatRouter.delete("/thread/:id", async (req, res) => {
  ChatThreadBusinessLogic.deleteChatThread(req.params.id);
  res.sendStatus(200);
});