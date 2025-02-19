import { NextFunction, Request, Response } from "express";
import { body, validationResult } from "express-validator";

export const handleValidationErrors = async (req: Request, res: Response, next: NextFunction):Promise<void> => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
         res.status(400).json({ errors: errors.array() });
         return
    }
    next();
}

export const validateMyUserRequest = [
    body("name").isString().notEmpty().withMessage('Name must be string'),
    body("addressLine1").isString().notEmpty().withMessage("Address Line 1 must be string"),
    body("city").isString().notEmpty().withMessage("city must be string"),
    body("country").isString().notEmpty().withMessage("country must be string"),
    handleValidationErrors
]


export const validateMyRestaurantRequest = [
    body("restaurantName").notEmpty().withMessage("Restaurant name is required"),
    body("city").notEmpty().withMessage("city is required"),
    body("country").notEmpty().withMessage("country is required"),
    body("deliveryPrice").isFloat({
        min: 0
    }).withMessage("deliveryPrice is required"),
    body("estimatedDeliveryTime").isInt({
        min: 0
    }).withMessage("estimated delivery time must be positive number"),
    body("cuisines").isArray().not().isEmpty().withMessage("cuisines must not be empty"),
    body("menuItems").isArray().withMessage("menus items must  be array"),
    body("menuItems.*.name").notEmpty().withMessage("menus items name is required"),
    body("menuItems.*.price").isFloat({ min: 0 }).withMessage("menus item price is required and postive number"),
    handleValidationErrors
]