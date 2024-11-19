import { Router } from "express";
import { authMiddleware } from "../middlewares/authentication";
import userRoutes from './user/user_routes';
import authRoutes from './auth/auth_routes';
import assetRoutes from './asset/asset_routes';
import branchRoutes from './branch/branch_routes';
import assettypesRoutes from './categories/assettypes_routes';
import resposibleRoutes from './responsibles/responsibles_routes';

const router = Router();

// Rutas definidas  
const routes = [
    { path: '/api/users', route: userRoutes, protected: false },
    { path: '/api/auth', route: authRoutes, protected: false },
    { path: '/api/asset', route: assetRoutes, protected: true },
    { path: '/api/branches', route: branchRoutes, protected: true },
    { path: '/api/assettypes', route: assettypesRoutes, protected: true },
    { path: '/api/responsibles', route: resposibleRoutes, protected: true }
];

// Registrar rutas
routes.forEach(({ path, route, protected: isProtected }) => {
    if (isProtected) {
        router.use(path, authMiddleware, route);
    } else {
        router.use(path, route);
    }
});

export default router;