import { pool } from "../../config/database/db";

export class SearchAssetsService {
    async getFilteredAssets(branch_id?: number, category_id?: number, subtype_id?: number): Promise<any[]> {
        try {
            // Construimos la base de la consulta
            let query = `
                SELECT 
                    a.id, 
                    a.name, 
                    a.description, 
                    a.value, 
                    a.status, 
                    a.specifications, 
                    a.registration_date, 
                    a.lifespan, 
                    a.depreciation_method,
                    ast.name AS asset_subtype_name,
                    b.name AS branch_name,
                    rp.name AS responsible_person_name
                FROM 
                    assets a
                INNER JOIN assetsubtypes ast ON a.asset_subtype_id = ast.id
                INNER JOIN branches b ON a.branch_id = b.id
                INNER JOIN responsiblepersons rp ON a.responsible_id = rp.id
            `;

            // Lista de condiciones para los filtros
            const conditions: string[] = [];
            const values: any[] = [];

            if (branch_id) {
                conditions.push(`a.branch_id = $${values.length + 1}`);
                values.push(branch_id);
            }

            if (category_id) {
                conditions.push(`ast.assettype_id = $${values.length + 1}`);
                values.push(category_id);
            }

            if (subtype_id) {
                conditions.push(`a.asset_subtype_id = $${values.length + 1}`);
                values.push(subtype_id);
            }

            // Agregar las condiciones a la consulta
            if (conditions.length > 0) {
                query += ` WHERE ${conditions.join(' AND ')}`;
            }

            // Ejecutar la consulta
            const result = await pool.query(query, values);
            return result.rows;
        } catch (error: any) {
            throw new Error(`Error al filtrar activos: ${error.message}`);
        }
    }
}
