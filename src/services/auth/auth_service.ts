import { pool } from '../../config/database/db';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { LoginUserDTO } from '../../DTOs/user/user_login_dto';

export class AuthService {

    async loginUser(loginUserDto: LoginUserDTO): Promise<any> {
        const { username, password } = loginUserDto;

        try {
            // Verificar si el usuario existe
            const userQuery = 'SELECT * FROM users WHERE username = $1';
            const result = await pool.query(userQuery, [username]);

            if (result.rows.length === 0) {
                return null;  // Usuario no encontrado
            }

            const user = result.rows[0];

            // Verificar la contraseña
            const validPassword = await bcrypt.compare(password, user.password);
            if (!validPassword) {
                return null;  // Contraseña incorrecta
            }

            // Generar JWT
            const token = jwt.sign(
                { id: user.id, username: user.username, role: user.role_id },
                process.env.JWT_SECRET as string,
                { expiresIn: '24h' }
            );

            //token y los datos del usuario
            return {
                token,
                user: {
                    id: user.id,
                    username: user.username,
                    email: user.email,
                    role: user.role_id
                }
            };
        } catch (error: any) {
            throw new Error(`Error logueando usuario: ${error.message}`);
        }
    }
}