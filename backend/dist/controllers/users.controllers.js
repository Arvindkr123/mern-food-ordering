"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateUserControllers = exports.createUserControllers = exports.getCurrentUserControllers = void 0;
const user_models_1 = __importDefault(require("../models/user.models"));
const getCurrentUserControllers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const currentUser = yield user_models_1.default.findOne({ _id: req.userId });
        if (!currentUser) {
            res.status(404).json({ message: 'user not found' });
            return;
        }
        res.json(currentUser);
    }
    catch (error) {
        console.error("Error creating user:", error);
        res.status(500).json({
            message: "Error creating user",
            error: error instanceof Error ? error.message : "Unknown error",
        });
    }
});
exports.getCurrentUserControllers = getCurrentUserControllers;
const createUserControllers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const _a = req.body, { auth0Id } = _a, rest = __rest(_a, ["auth0Id"]);
        console.log(req.body);
        // Check if `auth0id` is provided
        if (!auth0Id) {
            res.status(400).json({ message: "auth0id is required" });
            return;
        }
        // Check for an existing user
        const existingUser = yield user_models_1.default.findOne({ auth0Id });
        if (existingUser) {
            res.status(200).json({ message: "User already exists", user: existingUser.toObject() });
            return;
        }
        // Create a new user
        const newUser = new user_models_1.default(Object.assign({ auth0Id }, rest));
        yield newUser.save();
        res.status(201).json({ message: "User created successfully", user: newUser.toObject() });
    }
    catch (error) {
        console.error("Error creating user:", error);
        res.status(500).json({
            message: "Error creating user",
            error: error instanceof Error ? error.message : "Unknown error",
        });
    }
});
exports.createUserControllers = createUserControllers;
const updateUserControllers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name, addressLine1, country, city } = req.body;
        const user = yield user_models_1.default.findById(req === null || req === void 0 ? void 0 : req.userId);
        if (!user) {
            res.status(500).json({
                success: false,
                message: 'User not found'
            });
            return;
        }
        user.name = name;
        user.addressLine1 = addressLine1;
        user.city = city;
        user.country = country;
        yield user.save();
        res.json(user);
    }
    catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: "Error while updating user"
        });
    }
});
exports.updateUserControllers = updateUserControllers;
exports.default = {
    createUserControllers: exports.createUserControllers,
    updateUserControllers: exports.updateUserControllers,
    getCurrentUserControllers: exports.getCurrentUserControllers
};
