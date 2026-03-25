import { prisma } from "../lib/prisma.js";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "segredo123";

export async function loginService(email: string, password: string) {
  const user = await prisma.user.findUnique({
    where: { email },
  });

  if (!user) {
    throw new Error("E-mail ou senha inválidos.");
  }

  if (user.password !== password) {
    throw new Error("E-mail ou senha inválidos.");
  }

  const token = jwt.sign({ id: user.id }, JWT_SECRET, { expiresIn: "8h" });

  return {
    token,
    user: {
      id: user.id,
      name: user.name,
      email: user.email,
    },
  };
}