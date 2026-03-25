import { prisma } from "../lib/prisma.js";

export async function getUserByIdService(id: number) {
  const user = await prisma.user.findUnique({
    where: { id },
    select: { id: true, name: true, email: true },
  });

  if (!user) {
    throw new Error("Usuário não encontrado.");
  }

  return user;
}

export async function updateUserService(id: number, data: { name?: string; email?: string; password?: string }) {
  const user = await prisma.user.findUnique({ where: { id } });

  if (!user) {
    throw new Error("Usuário não encontrado.");
  }

  const updated = await prisma.user.update({
    where: { id },
    data,
    select: { id: true, name: true, email: true },
  });

  return updated;
}

export async function deleteUserService(id: number) {
  const user = await prisma.user.findUnique({ where: { id } });

  if (!user) {
    throw new Error("Usuário não encontrado.");
  }

  await prisma.user.delete({ where: { id } });

  return { message: "Usuário deletado com sucesso." };
}

export async function createUserService({
  name,
  email,
  password,
}: {
  name: string;
  email: string;
  password: string;
}) {
  const existingUser = await prisma.user.findUnique({
    where: { email },
  });

  if (existingUser) {
    throw new Error("E-mail já cadastrado.");
  }

  const user = await prisma.user.create({
    data: { name, email, password },
    select: { id: true, name: true, email: true },
  });

  return user;
}

export async function getAllUsersService() {
  const users = await prisma.user.findMany({
    select: { id: true, name: true, email: true },
  });
  return users;
}