import { PrismaClient } from "@prisma/client"
import bcrypt from "bcrypt"
import jwt, { Secret } from "jsonwebtoken";

import { Request, Response } from "express"
import { ReturnAPI } from "../resources/returnAPI";

const prisma = new PrismaClient();


class UserController {
    public async create(req: Request, res: Response) {

        if (!req.body.name) {
            const returnAPI = new ReturnAPI(false, 'nome é obrigatorio', {});
            return res.status(400).json(returnAPI);
        }
        if (!req.body.email) {
            const returnAPI = new ReturnAPI(false, 'email é obrigatorio', {});
            return res.status(400).json(returnAPI);
        }
        if (!req.body.password) {
            const returnAPI = new ReturnAPI(false, 'senha é obrigatorio', {});
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
                },
                select: {
                    email: true,
                    name: true,
                    id: true
                }
            })

            async () => { await prisma.$disconnect(); }

            const returnAPI = new ReturnAPI(true, "usuario cadastrado com sucesso", newUser)
            return res.status(201).json(returnAPI);

        } catch (err: any) {
            const returnAPI = new ReturnAPI(false, err.message, {})
            return res.status(500).json(returnAPI);
        }
    }

    public async login(req: Request, res: Response) {

        if (!req.body.email) {
            const returnAPI = new ReturnAPI(false, 'email é obrigatorio', {});
            return res.status(400).json(returnAPI);
        }
        if (!req.body.password) {
            const returnAPI = new ReturnAPI(false, 'senha é obrigatorio', {});
            return res.status(400).json(returnAPI);
        }


        const userMail = req.body.email
        const userPassword = req.body.password
        try {
            const userResult = await prisma.user.findFirst({
                where: {
                    email: {
                        equals: userMail
                    }
                },
                select: {
                    password: true,
                    email: true,
                    name: true,
                    id: true
                }

            });

            const checkPassword = await bcrypt.compare(userPassword, userResult!.password);

            if (!checkPassword) {
                const returnAPI = new ReturnAPI(false, 'Senha Invalida', {})
                return res.status(400).json(returnAPI);
            }

            try {

                const jwt_secret = process.env.JWT_SECRET;


                const jwt_token = jwt.sign({
                    id: userResult!.id,
                }, jwt_secret as Secret)

                async () => {
                    await prisma.$disconnect();
                }

                const returnAPI = new ReturnAPI(true, "Login efetuado com sucesso", { id: userResult!.id, name: userResult!.name, email: userResult!.email, token: jwt_token })
                return res.status(200).json(returnAPI);

            } catch (err: any) {
                const returnAPI = new ReturnAPI(false, err.message, {})
                return res.status(500).json(returnAPI);
            }
        } catch (err: any) {
            const returnAPI = new ReturnAPI(false, err.message, {})
            return res.status(500).json(returnAPI);
        }
    }
}

export const userController = new UserController();