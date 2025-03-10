import dotenv from 'dotenv';
import { Pool } from 'pg';

dotenv.config();

const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
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

export {pool , connectDB};