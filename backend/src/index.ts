import express, { Request, Response } from "express";
import cors from "cors";
import "dotenv/config";
import connectionDbHandler from "./utils/dbConnections";
import userRoutes from "./routes/user.routes";
import myRestaurentRoutes from "./routes/restaurent.routes";
import myRestaurentSearchRoutes from "./routes/search.restaurent.routes";
import { v2 as cloudinary } from "cloudinary";
import { envConfig } from "./utils/env.config";

const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
const allowedOrigins = ["http://localhost:5173"];

app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
  })
);

cloudinary.config({
  cloud_name: envConfig.CLOUDINARY_cloud_name,
  api_key: envConfig.CLOUDINARY_api_key,
  api_secret: envConfig.CLOUDINARY_api_secret,
});

// Routes

app.use("/api/my/user", userRoutes);
app.use("/api/my/resturant", myRestaurentRoutes);
app.use("/api/resturant", myRestaurentSearchRoutes);

app.get("/test", async (req: Request, res: Response) => {
  res.json({ message: "Hello!" });
});

connectionDbHandler()
  .then(() => {
    app.listen(7000, () => {
      console.log("Server started on http://localhost:7000");
    });
  })
  .catch(() => {});
