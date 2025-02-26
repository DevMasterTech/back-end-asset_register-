import { CreateAssetDTO } from '../../DTOs/asset/asset_register_dto';
import { pool } from '../../config/database/db';

export class AssetService {
    // Método para crear un activo
    async createAsset(createAssetDto: CreateAssetDTO): Promise<any> {
        const { name, description, asset_subtype_id, branch_id, responsible_id, value, status, specifications, lifespan, depreciation_method } = createAssetDto;
    
        try {
            const query = `
                INSERT INTO assets (name, description, asset_subtype_id, branch_id, responsible_id, value, status, specifications, registration_date, lifespan, depreciation_method)
                VALUES ($1, $2, $3, $4, $5, $6, $7, $8, NOW(), $9, $10)
                RETURNING *;
            `;

            const newAsset = await pool.query(query, [
                name,
                description,
                asset_subtype_id,
                branch_id,
                responsible_id,
                value,
                status,
                specifications,
                lifespan,
                depreciation_method
            ]);

            return newAsset.rows[0];
        } catch (error: any) {
            throw new Error(`Error al crear activo: ${error.message}`);
        }
    }

    async getAllAssets(): Promise<any[]> {
        try {
            const query = `
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
                    at.name AS asset_subtype_name,
                    b.name AS branch_name,
                    rp.name AS responsible_person_name
                FROM assets a
                JOIN assetsubtypes at ON a.asset_subtype_id = at.id
                JOIN branches b ON a.branch_id = b.id
                JOIN responsiblepersons rp ON a.responsible_id = rp.id;
            `;
    
            const result = await pool.query(query);
            return result.rows;
        } catch (error: any) {
            throw new Error(`Error al obtener los activos: ${error.message}`);
        }
    }
    
}