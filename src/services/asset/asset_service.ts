import { CreateAssetDTO } from '../../DTOs/asset/asset_register_dto';
import { pool } from '../../config/database/db';

export class AssetService {
    // Método para crear un activo
    async createAsset(createAssetDto: CreateAssetDTO): Promise<any> {
        const { name, description, asset_subtype_id, branch_id, responsible_id, value, status, specifications, registration_date, lifespan, depreciation_method } = createAssetDto;

        try {
            const query = `
                INSERT INTO assets (name, description, asset_subtype_id, branch_id, responsible_id, value, status, specifications, registration_date, lifespan, depreciation_method)
                VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)
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
                registration_date,
                lifespan,
                depreciation_method
            ]);

            return newAsset.rows[0];
        } catch (error: any) {
            throw new Error(`Error al crear activo: ${error.message}`);
        }
    }

    // Método para obtener todos los activos
    // async getAllAssets(): Promise<any[]> {
    //     try {
    //         const query = `SELECT * FROM assets;`;
    //         const assets = await pool.query(query);
    //         return assets.rows;
    //     } catch (error: any) {
    //         throw new Error(`Error al obtener los activos: ${error.message}`);
    //     }
    // }

    async getAllAssets(): Promise<any[]> {
        try {
            // Llamada al procedimiento almacenado
            const assets = await pool.query('SELECT * FROM get_assets_with_details();');
            return assets.rows;
        } catch (error: any) {
            throw new Error(`Error al obtener los activos: ${error.message}`);
        }
    }
}