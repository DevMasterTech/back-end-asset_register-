import { Request, Response } from 'express';
import { AuthService } from '../../services/auth/auth_service';

const authService = new AuthService();

export class AuthController {
    static async login(req: Request, res: Response): Promise<void> {
        const { username, password } = req.body;

        try {
            if (!username || !password) {
                res.status(400).json({ message: 'Username y password son requeridos' });
                return;
            }

            // Intentar logear el usuario
            const loginResult = await authService.loginUser({ username, password });

            if (!loginResult) {
                res.status(401).json({ message: 'Credenciales incorrectas' });
                return;
            }

            const { token, user } = loginResult;

            res.status(200).json({
                message: 'Ingreso exitoso',
                user: {
                    id: user.id,
                    username: user.username,
                    email: user.email,
                    role: user.role
                },
                token: token,
                loginTime: new Date().toISOString(),
            });
        } catch (error: any) {
            res.status(500).json({ message: `Error en el login: ${error.message}` });
        }
    }
}
