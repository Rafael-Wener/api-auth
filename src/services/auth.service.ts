import { UserService } from "./user.service.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();
const userService = new UserService();

class AppError extends Error {
    public status: number;
    constructor(message: string, status: number) {
        super(message);
        this.status = status;
    }
}

export class AuthService {
    async authenticate(email: string, passwordDigitada: string) {
        const user = await userService.findByEmail(email);

        if (!user) {
            throw new AppError("Credenciais inválidas", 401);
        }

        const isPasswordValid = await bcrypt.compare(passwordDigitada, user.password);

        if (!isPasswordValid) {
            throw new AppError("Credenciais inválidas", 401);
        }

        // A SECRET deve ser a mesma do .env para o middleware conseguir ler depois
        const secret = process.env.JWT_SECRET || "SUA_CHAVE_RESERVA";
        
        const token = jwt.sign(
            { sub: user.id, email: user.email }, 
            secret, 
            { expiresIn: "10h" }
        );

        return { 
            token, 
            user: { id: user.id, name: user.name, email: user.email } 
        };
    }
}