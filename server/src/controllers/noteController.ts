import { PrismaClient } from "@prisma/client"

import { Request, Response } from "express"
import { ReturnAPI } from "../resources/returnAPI";

const prisma = new PrismaClient();

class NoteController {

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
                    authorId: req.body.authorId
                }, select: {
                    id: true,
                    title: true,
                    body: true,
                    author: {
                        select: {
                            id: true,
                            name: true,
                            email: true
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

    public async show(req: Request, res: Response) {
        const noteId = req.params.noteId

        if (!req.body.authUser) {
            const returnAPI = new ReturnAPI(false, "Usuario não autenticado", {})
            return res.status(401).json(returnAPI);
        }

        const authUser = req.body.authUser

        try {
            const noteData = await prisma.note.findFirst({
                where: {
                    id: noteId,
                    authorId: authUser.id
                }, select: {
                    id: true,
                    title: true,
                    body: true,
                    author: {
                        select: {
                            id: true,
                            name: true,
                            email: true
                        }
                    }
                },
            });

            async () => {
                await prisma.$disconnect();
            }

            if (!noteData) {
                const returnAPI = new ReturnAPI(false, "Nota não encontrada", {})
                return res.status(500).json(returnAPI);
            }

            const returnAPI = new ReturnAPI(true, "Nota encontrada", noteData)
            return res.status(200).json(returnAPI);

        } catch (err: any) {
            const returnAPI = new ReturnAPI(false, err.message, {})
            return res.status(500).json(returnAPI);
        }


    }

    public async index(req: Request, res: Response) {

        if (!req.body.authUser) {
            const returnAPI = new ReturnAPI(false, "Usuario não autenticado", {})
            return res.status(401).json(returnAPI);
        }

        const authUser = req.body.authUser

        try {
            const authUserNotes = await prisma.note.findMany({
                where: {
                    authorId: authUser.id
                }, select: {
                    id: true,
                    title: true,
                    body: true,
                    author: {
                        select: {
                            id: true,
                            name: true,
                            email: true
                        }
                    }
                },
            });

            async () => {
                await prisma.$disconnect();
            }

            if (!authUserNotes) {
                const returnAPI = new ReturnAPI(false, "Notas não encontradas", {})
                return res.status(500).json(returnAPI);
            }

            const returnAPI = new ReturnAPI(true, "Notas encontradas", authUserNotes)
            return res.status(200).json(returnAPI);

        } catch (err: any) {
            const returnAPI = new ReturnAPI(false, err.message, {})
            return res.status(500).json(returnAPI);
        }

    }

    public async update(req: Request, res: Response) {

        const noteId = req.params.noteId

        if (!req.body.title) {
            const returnAPI = new ReturnAPI(false, 'Titulo é obrigatorio', {});
            return res.status(400).json(returnAPI);
        }
        if (!req.body.body) {
            const returnAPI = new ReturnAPI(false, 'Corpo da nota é obrigatorio', {});
            return res.status(400).json(returnAPI);
        }

        if (!req.body.authUser) {
            const returnAPI = new ReturnAPI(false, "Usuario não autenticado", {})
            return res.status(401).json(returnAPI);
        }

        const noteTitle = req.body.title;
        const noteBody = req.body.body;
        const authUser = req.body.authUser

        try {
            const updatedNote = await prisma.note.update({
                where: {
                    id: noteId
                },
                data: {
                    title: noteTitle,
                    body: noteBody
                },
                select: {
                    id: true,
                    title: true,
                    body: true,
                    author: {
                        select: {
                            id: true,
                            name: true,
                            email: true
                        }
                    }

                },
            });

            async () => {
                await prisma.$disconnect();
            }

            if (!updatedNote) {
                const returnAPI = new ReturnAPI(false, "Nota não encontrada", {})
                return res.status(500).json(returnAPI);
            }

            const returnAPI = new ReturnAPI(true, "Nota atualizada", updatedNote)
            return res.status(200).json(returnAPI);

        } catch (err: any) {
            const returnAPI = new ReturnAPI(false, err.message, {})
            return res.status(500).json(returnAPI);
        }

    }

    public async delete(req: Request, res: Response) {

        const noteId = req.params.noteId

        if (!req.body.authUser) {
            const returnAPI = new ReturnAPI(false, "Usuario não autenticado", {})
            return res.status(401).json(returnAPI);
        }

        const authUser = req.body.authUser

        try {
            const deletedNote = await prisma.note.delete({
                where: {
                    id: noteId
                },
                select: {
                    id: true,
                    title: true,
                    body: true,
                    author: {
                        select: {
                            id: true,
                            name: true,
                            email: true
                        }
                    }

                },
            });

            async () => {
                await prisma.$disconnect();
            }

            if (!deletedNote) {
                const returnAPI = new ReturnAPI(false, "falha ao deletar", {})
                return res.status(500).json(returnAPI);
            }

            const returnAPI = new ReturnAPI(true, "Nota deletada", deletedNote)
            return res.status(200).json(returnAPI);

        } catch (err: any) {
            const returnAPI = new ReturnAPI(false, err.message, {})
            return res.status(500).json(returnAPI);
        }

    }

    public async search(req: Request, res: Response) {

        if (!req.query.search) {
            const returnAPI = new ReturnAPI(false, "Parametro search ausente", {})
            return res.status(400).json(returnAPI);
        }

        if (!req.body.authUser) {
            const returnAPI = new ReturnAPI(false, "Usuario não autenticado", {})
            return res.status(401).json(returnAPI);
        }

        const search = req.query.search;
        const authUser = req.body.authUser;

        try {
            const searchNote = await prisma.note.findMany({
                where: {
                    authorId: authUser.id,
                    title: {
                        contains: search as string
                    }
                }, select: {
                    id: true,
                    title: true,
                    body: true,
                    author: {
                        select: {
                            id: true,
                            name: true,
                            email: true
                        }
                    }

                },
            });

            async () => {
                await prisma.$disconnect();
            }

            if (!searchNote) {
                const returnAPI = new ReturnAPI(false, "Nota não encontrada", {})
                return res.status(500).json(returnAPI);
            }

            const returnAPI = new ReturnAPI(true, "Notas encontradas", searchNote)
            return res.status(200).json(returnAPI);

        } catch (err: any) {
            const returnAPI = new ReturnAPI(false, err.message, {})
            return res.status(500).json(returnAPI);
        }

    }
}

export const noteController = new NoteController();