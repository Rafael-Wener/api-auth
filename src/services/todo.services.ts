import { prisma } from "../lib/prisma.js";

// Criar tarefa
export async function createTodoService(userId: number, task: string) {
  const todo = await prisma.todoList.create({
    data: { task, userId },
  });
  return todo;
}

// Listar tarefas do usuário
export async function getAllTodosService(userId: number) {
  const todos = await prisma.todoList.findMany({
    where: { userId },
  });
  return todos;
}

// Atualizar tarefa
export async function updateTodoService(id: number, userId: number, data: { task?: string; finished?: boolean }) {
  const todo = await prisma.todoList.findUnique({ where: { id } });

  if (!todo) throw new Error("Tarefa não encontrada.");
  if (todo.userId !== userId) throw new Error("Sem permissão para editar essa tarefa.");

  const updated = await prisma.todoList.update({
    where: { id },
    data,
  });
  return updated;
}

// Deletar tarefa
export async function deleteTodoService(id: number, userId: number) {
  const todo = await prisma.todoList.findUnique({ where: { id } });

  if (!todo) throw new Error("Tarefa não encontrada.");
  if (todo.userId !== userId) throw new Error("Sem permissão para deletar essa tarefa.");

  await prisma.todoList.delete({ where: { id } });
  return { message: "Tarefa deletada com sucesso." };
}