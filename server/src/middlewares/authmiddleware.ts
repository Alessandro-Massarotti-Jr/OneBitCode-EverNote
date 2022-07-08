import jwt, { Secret } from "jsonwebtoken";
import { Request, Response, NextFunction} from "express"
import { ReturnAPI } from "../resources/returnAPI";

class AuthMiddleware{
    public async authUser(req : Request, res : Response, next : NextFunction){
        const authToken = req.headers["authorization"];

        if(!req.headers["authorization"]){
            const returnAPI = new ReturnAPI(false,"Token de autenticação não informado",{});
            res.status(400).json(returnAPI);
        }
    
        try {

            const secret = process.env.JWT_SECRET;
            jwt.verify(authToken!, secret as Secret);
            next();

        } catch (err) {
            const returnAPI = new ReturnAPI(false,"Token invalido",{})
            return res.status(401).json(returnAPI);
        }
    }
}

export const authMiddleware = new AuthMiddleware(); 