import { Router } from "express";
import myRestaurantController from "../controllers/restaurant.controllers";
import multer from "multer";
import { jwtCheck, JWTParse } from "../middlewares/auth";
import {
  validateMyRestaurantRequest,
  validateMyUserRequest,
} from "../middlewares/validateMyRequest";

const router = Router();

const storage = multer.memoryStorage();
const upload = multer({
  storage: storage,
  limits: {
    fieldSize: 5 * 1024 * 1024, //5mb
  },
});

router.post(
  "/",
  upload.single("imageFile"),
  validateMyRestaurantRequest,
  jwtCheck,
  JWTParse,
  myRestaurantController.createMyRestaruant
);
router.put(
  "/",
  upload.single("imageFile"),
  validateMyRestaurantRequest,
  jwtCheck,
  JWTParse,
  myRestaurantController.updateMyRestaruant
);
router.get("/", jwtCheck, JWTParse, myRestaurantController.getMyRestaruant);

export default router;
