import express from "express";
//import { prisma } from './lib/prisma.js';
import { userRoutes } from "./routes/user.routes.js";
import { todoRoutes } from "./routes/todo.routes.js";
import { authRoutes } from "./routes/auth.routes.js";

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.get('/health', (req, res) => {
  res.json({ status: "OK" });
});

app.use("/users", userRoutes);
app.use("/todos", todoRoutes);
app.use("/auth", authRoutes);

app.listen(PORT, () => {
  console.log(`API rodando em http://localhost:${PORT}`);
});