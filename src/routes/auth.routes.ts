import { Router } from "express";
import { login } from "../controller/auth.controller.js";

const authRoutes = Router();

// POST /auth — Login
authRoutes.post("/", login);

export { authRoutes };