import type { Request, Response } from "express";
import { AuthService } from "../services/auth.service.js";

const authService = new AuthService();

export class AuthController {
    async login(req: Request, res: Response) {
        try {
            const { email, password } = req.body;
            
            // ATENÇÃO AQUI: Tem que passar as duas variáveis separadas!
            const result = await authService.authenticate(email, password);
            
            return res.json(result);
        } catch (err: any) {
            // Retorna o erro 401 com a mensagem "Credenciais inválidas"
            return res.status(err.status || 401).json({ error: err.message });
        }
    }
}