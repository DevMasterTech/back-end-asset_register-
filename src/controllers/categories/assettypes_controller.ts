import { Request , Response } from "express";
import { AssettypesService } from "../../services/categories/assettypes_service";

const assettypesService = new AssettypesService();

export class AssettypesController {
    static async getAllAssettypes(req: Request, res: Response): Promise<void> {
        try {
            const assettypes = await assettypesService.getAllAssettypes();
            res.status(200).json(assettypes);
        } catch (error: any) {
            res.status(500).json({ message: `Error al obtener las categorías de activos ${error.message}`});
        }
    }

    static async getAllAssetSubtypes(req: Request , res: Response): Promise<void> {
        try {
            const assetsubtypes = await assettypesService.getAllAssetSubtypes();
            res.status(200).json(assetsubtypes)
        } catch (error: any) {
            res.status(500).json({ message: `Error al obtener las sub categorías ${error.message}`});
        }
    }
}