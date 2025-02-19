"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.JWTParse = exports.jwtCheck = void 0;
const express_oauth2_jwt_bearer_1 = require("express-oauth2-jwt-bearer");
const env_config_1 = require("../utils/env.config");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const user_models_1 = __importDefault(require("../models/user.models"));
exports.jwtCheck = (0, express_oauth2_jwt_bearer_1.auth)({
    audience: env_config_1.envConfig.AUTH0_AUDIENCE,
    issuerBaseURL: env_config_1.envConfig.AUTH0_ISSUER_BASE_URL,
    tokenSigningAlg: 'RS256'
});
const JWTParse = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { authorization } = req.headers;
    // Bearer token
    if (!authorization || !authorization.startsWith("Bearer ")) {
        res.sendStatus(401);
        return;
    }
    const token = authorization.split(" ")[1];
    try {
        const decoded = jsonwebtoken_1.default.decode(token);
        const auth0Id = decoded.sub;
        const user = yield user_models_1.default.findOne({ auth0Id });
        if (!user) {
            res.sendStatus(401);
            return;
        }
        req.auth0Id = auth0Id;
        req.userId = user._id.toString();
        next();
    }
    catch (error) {
        console.log(error);
        res.sendStatus(401);
    }
});
exports.JWTParse = JWTParse;
