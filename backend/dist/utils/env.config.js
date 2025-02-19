"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.envConfig = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
const path_1 = __importDefault(require("path"));
dotenv_1.default.config({
    path: path_1.default.join(path_1.default.resolve(), '.env')
});
exports.envConfig = {
    MONGO_URI: process.env.MONGO_URI,
    APP_PORT: process.env.APP_PORT,
    AUTH0_AUDIENCE: process.env.AUTH0_AUDIENCE,
    AUTH0_ISSUER_BASE_URL: process.env.AUTH0_ISSUER_BASE_URL,
};
