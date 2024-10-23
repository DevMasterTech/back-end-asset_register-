import { Request, Response } from 'express';
import { AuthService } from '../../services/auth/auth_service';

const authService = new AuthService();

// export class AuthControllerfallido {

//     static async login(req: Request, res: Response): Promise<Response> {
//         try {
//             const { username, password } = req.body;
//             const token = await authService.loginUser({ username, password });

//             if (!token) {
//                 return res.status(401).json({ message: 'Credenciales Incorrectas' });
//             }
            
//             return res.json({ token });
//         } catch (error: any) {
//             return res.status(500).json({ message: `Error al logearse: ${error.message}` });
//         }
//     }
// }


export class AuthController {
    static async login(req: Request, res: Response): Promise<void> {
        const { username, password } = req.body;

        try {
            // Validar que los campos no estén vacíos
            if (!username || !password) {
                res.status(400).json({ message: 'Username y password son requeridos' });
                return;
            }

            // Intentar logear el usuario
            const token = await authService.loginUser({ username, password });

            // Verificar si el token es válido o nulo
            if (!token) {
                res.status(401).json({ message: 'Credenciales incorrectas' });
                return;
            }

            // Si todo es correcto, devolver el token
            res.status(200).json({ token });
        } catch (error: any) {
            // Capturar errores inesperados
            res.status(500).json({ message: `Error en el login: ${error.message}` });
        }
    }
}
