import express from "express";
import { noteController } from "../controllers/noteController";
import { authMiddleware } from "../middlewares/authmiddleware";

export const noteRouter = express.Router();


noteRouter.post("/",authMiddleware.authUser,noteController.create);

noteRouter.get("/:noteId",authMiddleware.authUser,noteController.show);

noteRouter.get("/",authMiddleware.authUser,noteController.index)