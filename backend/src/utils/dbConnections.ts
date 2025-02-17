import mongoose from "mongoose";
import { envConfig } from "./env.config";

const connectionDbHandler = async () => {
    try {
        const conn = await mongoose.connect(envConfig.MONGO_URI!);
        console.log("database connection established", conn.connection.host)
    } catch (error) {
        process.exit(1)
    }
}

export default connectionDbHandler;