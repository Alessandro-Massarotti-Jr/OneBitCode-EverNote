import express from "express"
import { userController } from "../controllers/userController";

export const userRouter = express.Router();


userRouter.get("/", async (req, res) => {

    return res.status(201).json({user:"usuario"});
})

userRouter.post("/register", userController.create );

userRouter.post("/login", userController.login );