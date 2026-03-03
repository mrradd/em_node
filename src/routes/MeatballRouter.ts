import { Router } from "express";
import { MeatballBusinessLogic } from "../BusinessLogic/MeatballBusinessLogic";
import { CreateMeatballRequestDTO } from "../DTOs/Meatball/CreateMeatballRequestDTO";

export const meatballRouter = Router();

//POST
//api/v1/meatball/create
//Creates a Meatball in the database and returns the created Meatball.
meatballRouter.post("/create", (req, res) => {
  const result = MeatballBusinessLogic.createMeatball(req.body as CreateMeatballRequestDTO);
  res.json({ data: result });
});

//GET
//api/v1/meatball/list
//Gets all meatballs from the database.
meatballRouter.post("/list", (req, res) => {
  const result = MeatballBusinessLogic.getMeatballs();
  res.json({ data: result });
});