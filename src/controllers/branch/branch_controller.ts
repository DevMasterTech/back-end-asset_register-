import { Request, Response } from "express";
import { BranchService } from "../../services/branch/branch_service";

const branchService = new BranchService();

export class BranchController {
    static async getAllBranches(req: Request, res: Response): Promise<void> {
        try {
            const branches = await branchService.getAllBranches();
            res.status(200).json(branches);
        } catch (error: any) {
            res.status(500).json({ message: `Error al obtener las sucursales: ${error.message}` });
        }
    }
}