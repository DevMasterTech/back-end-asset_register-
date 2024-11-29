import { pool } from "../../config/database/db";
import { getAllResponsiblesDto } from "../../DTOs/responsibles/responsibles_dto";

export class ResponsiblePersonService {
    async getAllResponsibles(): Promise<getAllResponsiblesDto[]> {
        try {
            
            const query = 'SELECT id, name FROM responsiblepersons';
            const result = await pool.query(query);

            return result.rows.map((row: any) => ({
                id: row.id,
                name: row.name
            }));

        } catch (error: any) {
            throw new Error (`Error al obtener los encargados: ${error.message}`)
        }
    }
}