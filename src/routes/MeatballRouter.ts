import { Router } from "express";
import { MeatballBusinessLogic } from "../BusinessLogic/MeatballBusinessLogic";

export const meatballRouter = Router();

meatballRouter.get("create", (req, res) => {
  const result = MeatballBusinessLogic.createMeatball(req.body as CreateMeatballRequestDTO);

  res.json({ data: result });
});