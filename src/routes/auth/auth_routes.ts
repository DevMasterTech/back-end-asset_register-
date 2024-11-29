import { Router } from "express";
import { AuthController } from "../../controllers/user/auth_controller";

const router = Router();

router.post('/login', AuthController.login);

export default router;
