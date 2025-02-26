import { Request , Response } from "express";
import { ResponsiblePersonService } from "../../services/responsibles/responsibles_service";
import { createResponsableDto } from '../../DTOs/responsibles/responsibles_dto';

const responsiblepersonService = new ResponsiblePersonService();

export class ResponsiblePersonController {
    static async getAllResponsibles(req: Request, res: Response): Promise<void> {
        try {
            const responsibles = await responsiblepersonService.getAllResponsibles();
            res.status(200).json(responsibles);
        } catch (error: any) {
            res.status(500).json({ message: `Error al obtener a los encargados ${error.message}`})
        }
    }

    static async createResponsable(req: Request, res: Response) {
        try {
            const createResponsableDto : createResponsableDto = req.body;
            const newResponsable = await responsiblepersonService.createResponsable(createResponsableDto);
            res.status(201).json({ message: 'Nuevo responsable creado', newResponsable });
        } catch (error: any) {
            res.status(400).json({ message: error.message });
        }
    }

    static async getAssetsByResponsibleCode(req: Request, res: Response): Promise<void> {
        try {
            const responsible_code = req.query.responsible_code ? Number(req.query.responsible_code) : undefined;
    
            if (!responsible_code) {
                res.status(400).json({ message: "El código del responsable es requerido" });
                return;
            }
    
            const assets = await responsiblepersonService.getAssetsByResponsibleCode(responsible_code);
    
            res.status(200).json(assets);
        } catch (error: any) {
            console.error("Error en el controlador:", error);
            res.status(500).json({ message: `Error al obtener los activos: ${error.message}` });
        }
    }
}