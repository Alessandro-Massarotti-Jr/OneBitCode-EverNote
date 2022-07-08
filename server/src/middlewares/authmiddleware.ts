import jwt, { Secret } from "jsonwebtoken";
import { Request, Response, NextFunction } from "express"
import { ReturnAPI } from "../resources/returnAPI";
import { PrismaClient } from "@prisma/client";


interface JwtPayload {
    id: string
    email:string,
    name:string,
}
  

const prisma = new PrismaClient();
class AuthMiddleware {
    public async authUser(req: Request, res: Response, next: NextFunction) {

        if (!req.headers["authorization"]) {
            const returnAPI = new ReturnAPI(false, "Token de autenticação não informado", {});
            res.status(400).json(returnAPI);
        }

        const authToken = req.headers["authorization"];

        try {

            const secret = process.env.JWT_SECRET;
              const decode = jwt.verify(authToken!, secret as Secret) as JwtPayload;


              if (!decode) {
                const returnAPI = new ReturnAPI(false, "Erro ao decodificar seu Token", {})
                return res.status(500).json(returnAPI);

            } else {
                try {
                    const tokenUser = await prisma.user.findUnique({
                        where: {
                            id: decode.id
                        }, select: {
                            id: true,
                            name: true,
                            email: true
                           
                        }
                    });

                    async () => {
                        await prisma.$disconnect();
                    }
                    
                    if (!tokenUser) {
                        const returnAPI = new ReturnAPI(false, "Erro ao localizar usuario", {})
                        return res.status(500).json(returnAPI);
                    }

                    req.body.authUser = tokenUser;
                    next();

                } catch (err: any) {
                    const returnAPI = new ReturnAPI(false, err.message, {})
                    return res.status(500).json(returnAPI);
                }
            }

        } catch (err) {
            const returnAPI = new ReturnAPI(false, "Token invalido", {})
            return res.status(401).json(returnAPI);
        }
    }
}

export const authMiddleware = new AuthMiddleware(); 