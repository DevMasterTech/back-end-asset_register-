import { Router } from "express";
import { UserController } from "../../controllers/user/user_controllers";

const router = Router();

router.post('/register', UserController.register)

export default router;