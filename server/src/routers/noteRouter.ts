import express from "express"
import { noteController } from "../controllers/noteController";
import { authMiddleware } from "../middlewares/authmiddleware";

export const noteRouter = express.Router();

noteRouter.get("/", async (req, res) => {

    return res.status(201).json({note:true});
})

noteRouter.post("/",authMiddleware.authUser,noteController.create)