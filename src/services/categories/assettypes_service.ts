import { pool } from "../../config/database/db";
import { getAssettypesDto } from "../../DTOs/categories/assettypes";

export class AssettypesService {
    async getAllAssettypes(): Promise<getAssettypesDto[]> {
        try {
            
            const query = 'SELECT id, name FROM assettypes';
            const result = await pool.query(query);
            
            return result.rows.map((row: any) => ({
                id: row.id,
                name: row.name,
            }));

        } catch (error: any) {
            throw new Error (`Error al obtener las categorias de activos: ${error.message}`);
        }
    }
}