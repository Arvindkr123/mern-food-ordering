"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const users_controllers_1 = __importDefault(require("../controllers/users.controllers"));
const auth_1 = require("../middlewares/auth");
const validateMyRequest_1 = require("../middlewares/validateMyRequest");
const router = (0, express_1.Router)();
router.get("/", auth_1.jwtCheck, auth_1.JWTParse, users_controllers_1.default.getCurrentUserControllers);
router.post("/", auth_1.jwtCheck, users_controllers_1.default.createUserControllers);
router.put("/", auth_1.jwtCheck, auth_1.JWTParse, validateMyRequest_1.validateMyUserRequest, users_controllers_1.default.updateUserControllers);
exports.default = router;
