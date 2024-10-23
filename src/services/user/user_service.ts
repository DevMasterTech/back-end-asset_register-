import { CreateUserDTO } from '../../DTOs/user/user_register_dto';
import bcrypt from 'bcrypt'
import { pool } from '../../config/database/db';

export class UserService {
    // Método para registrar un usuario
    async registerUser(createUserDto: CreateUserDTO): Promise<any> {
        const { username, email, password, role_id } = createUserDto;

        try {
            // Verificar si el usuario ya existe en la base de datos
            const userCheckQuery = 'SELECT * FROM users WHERE email = $1';
            const existingUser = await pool.query(userCheckQuery, [email]);

            if (existingUser.rows.length > 0) {
                throw new Error('Un usuario con este email ya existe');
            }

            // Encriptar la contraseña
            const hashedPassword = await bcrypt.hash(password, 10);

            // Insertar el nuevo usuario en la base de datos
            const insertUserQuery = `
                INSERT INTO users (username, role_id, email, password) 
                VALUES ($1, $2, $3, $4)
                RETURNING id, username, email, role_id;
            `;
            
            // Colocar los valores en el orden correcto según la estructura de tu tabla
            const newUser = await pool.query(insertUserQuery, [username, role_id, email, hashedPassword]);

            // Devolver el nuevo usuario (sin la contraseña)
            return newUser.rows[0];
        } catch (error: any) {
            throw new Error(`Error al registrar usuario: ${error.message}`);
        }
    }
}