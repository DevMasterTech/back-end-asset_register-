import { Request, Response, NextFunction, RequestHandler } from 'express';
import jwt from 'jsonwebtoken';

interface AuthRequest extends Request {
    user?: any; // Define el tipo de `user` según tu aplicación
}

export const authMiddleware: RequestHandler = (req: AuthRequest, res: Response, next: NextFunction): void => {
    const token = req.headers['authorization']?.split(' ')[1];

    if (!token) {
        res.status(401).json({ message: 'Acceso denegado. Token no proporcionado.' });
        return; // Asegúrate de usar `return` para terminar la función
    }
    
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET as string);
        req.user = decoded;
        next(); // Llama siempre a `next()` si el token es válido
    } catch (error) {
        res.status(403).json({ message: 'Token inválido o expirado.' });
    }
};
