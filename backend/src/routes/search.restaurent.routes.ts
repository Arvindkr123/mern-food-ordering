import { Router } from "express";
import { param } from "express-validator";
import restaurantControllers from "../controllers/restaurant.controllers";

const router = Router();

router.get(
  "/search/:city",
  param("city")
    .isString()
    .trim()
    .notEmpty()
    .withMessage("City parameter must be valid string"),
  restaurantControllers.searchRestaurant
);

export default router;
