import { Router } from "express";
import { AssetController } from "../../controllers/asset/asset_controller";

const router = Router();

router.post('/create', AssetController.createAsset);
router.get('/all', AssetController.getAllAssets);

export default router;