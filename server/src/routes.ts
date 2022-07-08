import express from "express"
import { noteRouter } from "./routers/noteRouter";
import { userRouter } from "./routers/userRouter";

export const routes = express.Router();


routes.get("/", async (req, res) => {

    return res.status(201).json({ola:"mundo"});
})

routes.use("/users",userRouter);

routes.use("/notes",noteRouter);