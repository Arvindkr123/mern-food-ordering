import { Router } from "express";
import MyUserControllers from "../controllers/users.controllers";
import { jwtCheck, JWTParse } from "../middlewares/auth";
import { validateMyUserRequest } from "../middlewares/validateMyRequest";

const router = Router();

router.post("/", jwtCheck, MyUserControllers.createUserControllers);
router.put("/", jwtCheck, JWTParse, validateMyUserRequest as any, MyUserControllers.updateUserControllers);

export default router;