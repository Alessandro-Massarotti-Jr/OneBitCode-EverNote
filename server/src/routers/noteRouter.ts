import express from "express";
import { noteController } from "../controllers/noteController";
import { authMiddleware } from "../middlewares/authmiddleware";

export const noteRouter = express.Router();

noteRouter.get("/",authMiddleware.authUser,noteController.index)

noteRouter.get("/search",authMiddleware.authUser,noteController.search);

noteRouter.get("/:noteId",authMiddleware.authUser,noteController.show);

noteRouter.post("/",authMiddleware.authUser,noteController.create);

noteRouter.put("/:noteId",authMiddleware.authUser,noteController.update);

noteRouter.delete("/:noteId",authMiddleware.authUser,noteController.delete);