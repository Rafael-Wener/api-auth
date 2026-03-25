import type { Request, Response } from "express";
import { createUserService, getAllUsersService, getUserByIdService, updateUserService, deleteUserService } from "../services/user.services.js";

export async function createUser(req: Request, res: Response) {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json({ error: "name, email e password são obrigatórios." });
  }

  try {
    const user = await createUserService({ name, email, password });
    return res.status(201).json(user);
  } catch (error: any) {
    return res.status(400).json({ error: error.message });
  }
}

export async function getAllUsers(req: Request, res: Response) {
  try {
    const users = await getAllUsersService();
    return res.status(200).json(users);
  } catch (error: any) {
    return res.status(400).json({ error: error.message });
  }
}

export async function getUserById(req: Request, res: Response) {
  const id = Number(req.params.id);

  try {
    const user = await getUserByIdService(id);
    return res.status(200).json(user);
  } catch (error: any) {
    return res.status(404).json({ error: error.message });
  }
}

export async function updateUser(req: Request, res: Response) {
  const id = Number(req.params.id);
  const { name, email, password } = req.body;

  try {
    const user = await updateUserService(id, { name, email, password });
    return res.status(200).json(user);
  } catch (error: any) {
    return res.status(400).json({ error: error.message });
  }
}

export async function deleteUser(req: Request, res: Response) {
  const id = Number(req.params.id);

  try {
    const result = await deleteUserService(id);
    return res.status(200).json(result);
  } catch (error: any) {
    return res.status(404).json({ error: error.message });
  }
}