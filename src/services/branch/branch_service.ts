import { pool } from '../../config/database/db';
import { GetBranchDto } from '../../DTOs/branch/branch_dto';

export class BranchService {
    async getAllBranches(): Promise<GetBranchDto[]> {
        try {
            const query = 'SELECT id, name FROM branches';
            const result = await pool.query(query);

            // Mapear los resultados a al dto
            return result.rows.map((row: any) => ({
                id: row.id,
                name: row.name,
            }));
        } catch (error: any) {
            throw new Error(`Error al obtener las sucursales: ${error.message}`);
        }
    }
}