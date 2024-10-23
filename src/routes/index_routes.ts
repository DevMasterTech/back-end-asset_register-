import { Router } from "express";
import userRoutes from './user/user_routes';
import authRoutes from './auth/auth_routes';

const router = Router();

//Array de rutas
const routes = [
    { path: '/api/users', route: userRoutes },
    { path: '/api/users', route: authRoutes}
]

//Aquí registro las rutas
routes.forEach(({ path, route }) => {
    router.use(path, route);
});

export default router;