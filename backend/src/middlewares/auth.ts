import { auth } from "express-oauth2-jwt-bearer"
import { envConfig } from "../utils/env.config";
import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken"
import UserModels from "../models/user.models";

declare global {
    namespace Express {
        interface Request {
            userId: String;
            auth0Id: String;
        }
    }
}

export const jwtCheck = auth({
    audience: envConfig.AUTH0_AUDIENCE,
    issuerBaseURL: envConfig.AUTH0_ISSUER_BASE_URL,
    tokenSigningAlg: 'RS256'
});

export const JWTParse = async (req: Request, res: Response, next: NextFunction): Promise<void>=> {
    const { authorization } = req.headers;

    // Bearer token
    if (!authorization || !authorization.startsWith("Bearer ")) {
         res.sendStatus(401);
         return;
    }

    const token = authorization.split(" ")[1];

    try {
        const decoded = jwt.decode(token) as jwt.JwtPayload;

        const auth0Id = decoded.sub;

        const user = await UserModels.findOne({ auth0Id })

        if (!user) {
             res.sendStatus(401);
             return;
        }

        req.auth0Id = auth0Id as string;
        req.userId = user._id.toString();

        next();


    } catch (error) {
        console.log(error);
        res.sendStatus(401)
    }
}