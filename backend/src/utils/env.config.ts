import dotenv from "dotenv";
import path from "path";

dotenv.config({
    path: path.join(path.resolve(), '.env')
})

export const envConfig ={
    MONGO_URI:process.env.MONGO_URI,
    APP_PORT:process.env.APP_PORT,
    AUTH0_AUDIENCE:process.env.AUTH0_AUDIENCE,
    AUTH0_ISSUER_BASE_URL:process.env.AUTH0_ISSUER_BASE_URL,
}