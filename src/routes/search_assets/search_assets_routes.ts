import { Router } from "express";
import { SearchAssetsController } from "../../controllers/search_assets/search_assets_controller";

const router = Router();

router.get('/getFilteredAssets', SearchAssetsController.getFilteredAssets);

export default router;