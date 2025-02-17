import { auth } from "express-oauth2-jwt-bearer"
import { envConfig } from "../utils/env.config";

export const jwtCheck = auth({
    audience: envConfig.AUTH0_AUDIENCE,
    issuerBaseURL: envConfig.AUTH0_ISSUER_BASE_URL,
    tokenSigningAlg: 'RS256'
});

// enforce on all endpoints
//   app.use(jwtCheck);