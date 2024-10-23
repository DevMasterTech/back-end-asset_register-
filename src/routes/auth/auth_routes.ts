import { Router } from "express";
import { AuthController } from "../../controllers/user/auth_controller";

const router = Router();

//const authController = new AuthController();

router.post('/login', AuthController.login);

export default router;

