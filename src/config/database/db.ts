import dotenv from 'dotenv';
import { Pool } from 'pg';

dotenv.config();

const pool = new Pool({
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT),
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    ssl: {
        rejectUnauthorized: false,
    }
});

const connectDB = async () => {
    try {
        await pool.connect();
        console.log('Conexión exitosa a la base de datos PostgreSQL');
    } catch (err) {
        console.error('Error al conectar a la base de datos:', err);
        process.exit(1);
    }
};

export {pool ,  connectDB};