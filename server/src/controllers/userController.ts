import { PrismaClient } from "@prisma/client"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken";

import { Request, Response } from "express"
import { ReturnAPI } from "../resources/returnAPI";

const prisma = new PrismaClient();


class UserController {
    public async create(req: Request, res: Response) {

        if (!req.body.name) {
          const returnAPI = new ReturnAPI(false,'nome é obrigatorio',{});
          return res.status(400).json(returnAPI);
        }
        if (!req.body.email) {
            const returnAPI = new ReturnAPI(false,'email é obrigatorio',{});
            return res.status(400).json(returnAPI);
        }
        if (!req.body.password) {
            const returnAPI = new ReturnAPI(false,'senha é obrigatorio',{});
            return res.status(400).json(returnAPI);
        }
        const userPassword = req.body.password;
        const salt = await bcrypt.genSalt(12);
        const passwordhash = await bcrypt.hash(userPassword, salt);

        try {
            const newUser = await prisma.user.create({
                data: {
                    email: req.body.email,
                    password: passwordhash,
                    name: req.body.name
                }
            })

            async () => { await prisma.$disconnect(); }

            const returnAPI = new ReturnAPI(true,"usuario cadastrado com sucesso",newUser)
            return res.status(201).json(returnAPI);

        } catch (err: any) {
            const returnAPI = new ReturnAPI(false,err.message,{})
            return res.status(500).json(returnAPI);
        }
    }
}

export const userController = new UserController();