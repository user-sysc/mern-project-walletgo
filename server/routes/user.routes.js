import * as UserController from "../controllers/user.controller.js";
import { Router } from "express";

const router = Router();

router.post("/signup", UserController.createUser); // Register
router.post("/login", UserController.signin); // Login
router.get("/verify", UserController.validationToken); // Validation token
router.post("/logout", UserController.logout); // Logout
router.delete("/delete", UserController.deleteUser); // Delete user

export default router;
