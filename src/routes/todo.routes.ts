import { Router } from "express";
import { createTodo, getAllTodos, updateTodo, deleteTodo } from "../controller/todo.controller.js";

const todoRoutes = Router();

todoRoutes.post("/", createTodo);
todoRoutes.get("/", getAllTodos);
todoRoutes.put("/:id", updateTodo);
todoRoutes.delete("/:id", deleteTodo);

export { todoRoutes };