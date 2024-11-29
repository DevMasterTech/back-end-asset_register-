import { Request, Response } from "express";
import { AssetService } from '../../services/asset/asset_service';
import { CreateAssetDTO } from '../../DTOs/asset/asset_register_dto';

const assetService = new AssetService();

export class AssetController {

    // Crear un nuevo activo
    static async createAsset(req: Request, res: Response) {
        try {
            const createAssetDto: CreateAssetDTO = req.body;
            const newAsset = await assetService.createAsset(createAssetDto);
            res.status(201).json({ message: 'Nuevo activo creado', newAsset });
        } catch (error: any) {
            res.status(400).json({ message: error.message });
        }
    }

    // Obtener todos los activos
    static async getAllAssets(req: Request, res: Response) {
        try {
            const assets = await assetService.getAllAssets();
            res.status(200).json(assets);
        } catch (error: any) {
            res.status(400).json({ message: error.message });
        }
    }
}