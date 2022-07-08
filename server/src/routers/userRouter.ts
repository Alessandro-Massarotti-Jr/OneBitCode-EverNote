import express from "express"
import { userController } from "../controllers/userController";
import { authMiddleware } from "../middlewares/authmiddleware";

export const userRouter = express.Router();


userRouter.get("/",authMiddleware.authUser , async (req, res) => {

    return res.status(201).json({user:"usuario"});
})

userRouter.post("/register", userController.create );

userRouter.post("/login", userController.login );