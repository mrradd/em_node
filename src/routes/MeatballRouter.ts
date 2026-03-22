import { Router } from "express";
import { MeatballBusinessLogic } from "../BusinessLogic/MeatballBusinessLogic";
import { CreateMeatballRequestDTO } from "../DTOs/Meatball/CreateMeatballRequestDTO";
import { UpdateMeatballRequestDTO } from "../DTOs/Meatball/UpdateMeatballRequestDTO";

export const meatballRouter = Router();

//POST
//api/v1/meatball/create
//Creates a Meatball in the database and returns the created Meatball.
meatballRouter.post("/create", (req, res) => {
  const result = MeatballBusinessLogic.createMeatball(req.body as CreateMeatballRequestDTO);

  if (!result) {
    res.status(404).json({ errorMessage: "Meatball not created." });
    return;
  }

  res.json({ data: result });
});

//DELETE
//api/v1/meatball/delete/:id
//Deletes a meatball by id.
meatballRouter.delete("/:id", (req, res) => {
  const result: boolean = MeatballBusinessLogic.deleteMeatballById(req.params.id);

  if (!result) {
    res.status(404).json({ errorMessage: "Meatball not found or deleted." });
    return;
  }

  res.json({ data: result });
});

//GET
//api/v1/meatball/:id
//Gets a meatball by id.
meatballRouter.get("/:id", (req, res) => {
  const result = MeatballBusinessLogic.getMeatballById(req.params.id);

  if (!result) {
    res.status(404).json({ errorMessage: "Meatball not found." });
    return;
  }

  res.json({ data: result });
});

//GET
//api/v1/meatball/list
//Gets all meatballs from the database.
meatballRouter.get("/list/all", (req, res) => {
  const result = MeatballBusinessLogic.getMeatballs();

  if (!result) {
    res.status(404).json({ errorMessage: "Meatballs not found." });
    return;
  }

  res.json({ data: result });
});

//PATCH
//api/v1/meatball/:id
//Updated the meatball with the given id.
meatballRouter.patch("/update", (req, res) => {
  const result = MeatballBusinessLogic.updateMeatball(req.body as UpdateMeatballRequestDTO);

  if (!result) {
    res.status(404).json({ errorMessage: "Meatball not updated." });
  }

  res.json({ data: result });
});