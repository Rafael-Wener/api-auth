import { Router } from "express";
import { createUser, getAllUsers, getUserById, updateUser, deleteUser } from "../controller/user.controller.js";

const userRoutes = Router();

userRoutes.post("/", createUser);
userRoutes.get("/", getAllUsers);
userRoutes.get("/:id", getUserById);
userRoutes.put("/:id", updateUser);
userRoutes.delete("/:id", deleteUser);

export { userRoutes };