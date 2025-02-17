import { Router } from "express";
import MyUserControllers from "../controllers/users.controllers";
import { jwtCheck } from "../middlewares/auth";

const router = Router();

router.post("/", jwtCheck, MyUserControllers.createUserControllers);

export default router;