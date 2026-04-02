import type { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

export const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return res.status(401).json({ error: "Token não fornecido ou malformatado" });
    }

    const token = authHeader.split(" ")[1];

    // ESTA É A LINHA QUE SALVA O TYPESCRIPT:
    if (!token) {
        return res.status(401).json({ error: "Token ausente" });
    }

    const secret = process.env.JWT_SECRET || "SUA_CHAVE_RESERVA";

    try {
        const decoded = jwt.verify(token, secret) as any;
        (req as any).user = decoded.sub;
        return next();
    } catch (err) {
        return res.status(401).json({ error: "Token inválido" });
    }
};