import { Router } from "express";
import { BranchController } from "../../controllers/branch/branch_controller";

const router = Router();

router.get('/getAll', BranchController.getAllBranches);

export default router;