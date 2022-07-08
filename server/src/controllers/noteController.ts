import { PrismaClient } from "@prisma/client"

import { Request, Response } from "express"
import { ReturnAPI } from "../resources/returnAPI";

const prisma  = new PrismaClient();

class NoteController{
    public async create(req: Request, res: Response) {
        if (!req.body.title) {
            const returnAPI = new ReturnAPI(false, 'Titulo é obrigatorio', {});
            return res.status(400).json(returnAPI);
        }
        if (!req.body.body) {
            const returnAPI = new ReturnAPI(false, 'Corpo da nota é obrigatorio', {});
            return res.status(400).json(returnAPI);
        }
        if (!req.body.authorId) {
            const returnAPI = new ReturnAPI(false, 'Id do usuario é obrigatorio', {});
            return res.status(400).json(returnAPI);
        }

        try {
            const newNote = await prisma.note.create({
                data: {
                    title: req.body.title,
                    body: req.body.body,
                    authorId:req.body.authorId
                },select:{
                    id:true,
                    title:true,
                    body:true,
                    author:{
                        select:{
                            id:true,
                            name:true,
                            email:true
                        }  
                    }
                }    
            })

            async () => { await prisma.$disconnect(); }

            const returnAPI = new ReturnAPI(true, "Nota cadastrada com sucesso", newNote)
            return res.status(201).json(returnAPI);

        } catch (err: any) {
            const returnAPI = new ReturnAPI(false, err.message, {})
            return res.status(500).json(returnAPI);
        }


    }

}

export const noteController = new NoteController();