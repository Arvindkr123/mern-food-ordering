import { Request, Response } from "express";
import UserModels from "../models/user.models";

export const createUserControllers = async (req: Request, res: Response): Promise<void> => {
    try {
        const { auth0Id, ...rest } = req.body;
        console.log(req.body)

        // Check if `auth0id` is provided
        if (!auth0Id) {
            res.status(400).json({ message: "auth0id is required" });
            return;
        }

        // Check for an existing user
        const existingUser = await UserModels.findOne({ auth0Id });

        if (existingUser) {
            res.status(200).json({ message: "User already exists", user: existingUser.toObject() });
            return;
        }

        // Create a new user
        const newUser = new UserModels({ auth0Id, ...rest });

        await newUser.save();

        res.status(201).json({ message: "User created successfully", user: newUser.toObject() });
    } catch (error) {
        console.error("Error creating user:", error);

        res.status(500).json({
            message: "Error creating user",
            error: error instanceof Error ? error.message : "Unknown error",
        });
    }
};

export const updateUserControllers = async (req: Request, res: Response): Promise<void> => {
    try {
        const { name, addressLine1, country, city } = req.body;
        const user = await UserModels.findById(req?.userId);

        if (!user) {
            res.status(500).json({
                success: false,
                message: 'User not found'
            })
            return;
        }

        user.name = name;
        user.addressLine1 = addressLine1;
        user.city = city;
        user.country = country;

        await user.save();

        res.json(user);

    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: "Error while updating user"
        })

    }
}

export default {
    createUserControllers,
    updateUserControllers
};
