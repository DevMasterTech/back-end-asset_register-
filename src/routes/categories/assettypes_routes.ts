import { Router } from "express";
import { AssettypesController } from "../../controllers/categories/assettypes_controller";

const router = Router();

router.get('/getAll', AssettypesController.getAllAssettypes)

export default router;