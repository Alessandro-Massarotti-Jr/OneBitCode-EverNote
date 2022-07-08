import express from "express"

export const noteRouter = express.Router();

noteRouter.get("/", async (req, res) => {

    return res.status(201).json({note:true});
})