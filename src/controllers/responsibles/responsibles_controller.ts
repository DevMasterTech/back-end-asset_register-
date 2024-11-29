import { Request , Response } from "express";
import { ResponsiblePersonService } from "../../services/responsibles/responsibles_service";

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
}