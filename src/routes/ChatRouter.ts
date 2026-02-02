import { Router } from "express";
import { ChatBusinessLogic } from "../BusinessLogic/ChatBusinessLogic";
import { ChatThreadBusinessLogic } from "../BusinessLogic/ChatThreadBusinessLogic";

export const chatRouter = Router();

//POST
//api/v1/chat/send
//Sends a chat request to an LLM for a specific ChatThread for the given prompt and all the thread's related chats. 
chatRouter.post("/send", async (req, res) => {
  const result = await ChatBusinessLogic.sendChatRequest(req.body);
  res.json({ data: result });
});

//POST
//api/v1/chat/thread/create
//Creates a new ChatThread.
chatRouter.post("/thread/create", (req, res) => {
  const result = ChatThreadBusinessLogic.createNewChatThread(req.body);
  console.info(`Created chat thread ${result.id} | ${result.name}`)
  res.json({ data: result });
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
//Deletes a ChatThread with the given ID.
chatRouter.delete("/thread/:id", async (req, res) => {

});