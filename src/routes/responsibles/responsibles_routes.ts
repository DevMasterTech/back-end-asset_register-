import { Router } from "express";
import { ResponsiblePersonController } from "../../controllers/responsibles/responsibles_controller";

const router = Router();

router.get('/getAll', ResponsiblePersonController.getAllResponsibles);

export default router;