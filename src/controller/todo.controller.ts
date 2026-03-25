import type { Request, Response } from "express";
import { createTodoService, getAllTodosService, updateTodoService, deleteTodoService } from "../services/todo.services.js";

export async function createTodo(req: Request, res: Response) {
  const { task, userId } = req.body;

  if (!task || !userId) {
    return res.status(400).json({ error: "Os campos task e userId são obrigatórios." });
  }

  try {
    const todo = await createTodoService(userId, task);
    return res.status(201).json(todo);
  } catch (error: any) {
    return res.status(400).json({ error: error.message });
  }
}

export async function getAllTodos(req: Request, res: Response) {
  const { userId } = req.body;

  if (!userId) {
    return res.status(400).json({ error: "O campo userId é obrigatório." });
  }

  try {
    const todos = await getAllTodosService(userId);
    return res.status(200).json(todos);
  } catch (error: any) {
    return res.status(400).json({ error: error.message });
  }
}

export async function updateTodo(req: Request, res: Response) {
  const id = Number(req.params.id);
  const { userId, task, finished } = req.body;

  if (!userId) {
    return res.status(400).json({ error: "O campo userId é obrigatório." });
  }

  try {
    const todo = await updateTodoService(id, userId, { task, finished });
    return res.status(200).json(todo);
  } catch (error: any) {
    return res.status(400).json({ error: error.message });
  }
}

export async function deleteTodo(req: Request, res: Response) {
  const id = Number(req.params.id);
  const { userId } = req.body;

  if (!userId) {
    return res.status(400).json({ error: "O campo userId é obrigatório." });
  }

  try {
    const result = await deleteTodoService(id, userId);
    return res.status(200).json(result);
  } catch (error: any) {
    return res.status(404).json({ error: error.message });
  }
}