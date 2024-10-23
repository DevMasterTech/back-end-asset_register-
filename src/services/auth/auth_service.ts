import { pool } from '../../config/database/db';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { LoginUserDTO } from '../../DTOs/user/user_login_dto';

export class AuthService {
    async loginUser(loginUserDto: LoginUserDTO): Promise<string | null> {
        const { username, password } = loginUserDto;
        
        // Verificar si el usuario existe
        const query = 'SELECT * FROM users WHERE username = $1';
        const result = await pool.query(query, [username]);

        if (result.rows.length === 0) {
            return null; // Usuario no encontrado
        }

        const user = result.rows[0];

        // Verificar si la contraseña es correcta
        const passwordMatch = await bcrypt.compare(password, user.password);
        if (!passwordMatch) {
            return null; // Contraseña incorrecta
        }

        // Generar el token JWT
        const token = jwt.sign(
            { userId: user.id, role: user.role_id }, // Payload del token
            process.env.JWT_SECRET || 'secret', // Clave secreta para firmar el token
            { expiresIn: '6h' } // El token expira en 1 hora
        );

        return token;
    }
}