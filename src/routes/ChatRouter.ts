import { Router } from "express";
import { sendChatRequest } from "../BusinessLogic/ChatBusinessLogic";

export const chatRouter = Router();

//POST
//api/v1/chat/send
//Sends a chat request to an LLM for a specific ChatThread for the given prompt and all the thread's related chats. 
chatRouter.post("/send", async (req, res) => {
  const resp = await sendChatRequest(req.body.message, req.body.threadId);
  res.json({
    data: resp,
  });  
});

//POST
//api/v1/chat/thread/create
//Creates a new ChatThread.
chatRouter.post("/thread/create", async (req, res) => {
  try {
    res.json({
      data: "Yay.",
    });
  }
  catch(err: any) {
    //TODO
  }
});

//PATCH
//api/v1/chat/thread/update
//Updates an existing ChatThread with the passed in information.
chatRouter.patch("/thread/update", async (req, res) => {
    try {
    res.json({
      data: "Yay.",
    });
  }
  catch(err: any) {
    //TODO
  }
});

//GET
//api/v1/chat/thread/all
//Returns all ChatThreads.
chatRouter.get("/thread/all", async (req, res) => {
    try {
    res.json({
      data: "Yay.",
    });
  }
  catch(err: any) {
    //TODO
  }
});

//GET
//api/v1/chat/thread/:id
//Gets all information for a ChatThread including all of its Chats.
chatRouter.get("/thread/:id", async (req, res) => {
    try {
    res.json({
      data: "Yay.",
    });
  }
  catch(err: any) {
    //TODO
  }
});

//DELETE
//api/v1/chat/thread/:id
//Deletes a ChatThread with the given ID.
chatRouter.delete("/thread/:id", async (req, res) => {
    try {
    res.json({
      data: "Yay.",
    });
  }
  catch(err: any) {
    //TODO
  }
});