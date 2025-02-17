import express, { Request, Response } from "express";
import cors from "cors";
import "dotenv/config";
import connectionDbHandler from "./utils/dbConnections";
import userRoutes from "./routes/user.routes";

const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
const allowedOrigins = ['http://localhost:5173', 'http://example.com'];

app.use(cors({
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  }
}));


// Routes

app.use("/api/my/user", userRoutes)


app.get("/test", async (req: Request, res: Response) => {
  res.json({ message: "Hello!" });
});


connectionDbHandler().then(() => {
  app.listen(7000, () => {
    console.log("Server started on http://localhost:7000");
  });

}).catch(() => { })
