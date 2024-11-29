import { SearchAssetsService } from './../../services/search_assets/search_assets_service';
import { Request, Response } from "express";

const searchservice = new SearchAssetsService();

export class SearchAssetsController {
    static async getFilteredAssets(req: Request, res: Response): Promise<void> {
        try {
            //aqui vamos a extraer las respuestas
            const branch_id = req.query.branch_id ? Number(req.query.branch_id) : undefined;
            const category_id  = req.query.category_id ? Number(req.query.category_id) : undefined;
            const subtype_id = req.query.subtype_id ? Number(req.query.subtype_id) : undefined;

            //aqui solo llamamos al servicio flaco no hagas nada mas
            const assets = await searchservice.getFilteredAssets(branch_id, category_id, subtype_id);

            res.status(200).json(assets)

        } catch (error: any) {
            res.status(500).json({message: `Error al obtener los activos ${error.message}`})
        }
    }
}