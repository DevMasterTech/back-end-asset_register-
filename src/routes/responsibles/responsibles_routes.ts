import { Router } from "express";
import { ResponsiblePersonController } from "../../controllers/responsibles/responsibles_controller";

const router = Router();

router.get('/getAll', ResponsiblePersonController.getAllResponsibles);
router.post('/newResponsable', ResponsiblePersonController.createResponsable);
router.get('/searchResponsable', ResponsiblePersonController.getAssetsByResponsibleCode);

export default router;