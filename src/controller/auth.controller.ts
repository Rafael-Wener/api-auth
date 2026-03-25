import type { Request, Response } from "express";
import { loginService } from "../services/auth.services.js";

export async function login(req: Request, res: Response) {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: "email e password são obrigatórios." });
  }

  try {
    const result = await loginService(email, password);
    return res.status(200).json(result);
  } catch (error: any) {
    return res.status(401).json({ error: error.message });
  }
}