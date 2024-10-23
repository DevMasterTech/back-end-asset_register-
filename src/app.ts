import express, { Express } from "express";
import cors from 'cors';
import dotenv from 'dotenv';
import {connectDB} from "./config/database/db";
import routes from './routes/index_routes';

dotenv.config();
const app: Express = express();

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//Conexión a db
const startServer = async () => {
    await connectDB();
}
startServer();

//Usar las rutas centralizadas
app.use(routes)

// Configuración de CORS
const corsOptions = {
    origin: '*',
    methods: ['*'],
    allowedHeaders: ['Content-Type', 'Authorization']
};
app.use(cors(corsOptions));

// Manejo de errores
app.use((err: Error, req: express.Request, res: express.Response, next: express.NextFunction) => {
    console.error(err.stack);
    res.status(500).send('Algo salió mal flaco!');
});

export default app;