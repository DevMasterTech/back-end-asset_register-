import { pool } from "../../config/database/db";
import { getAssettypesDto } from "../../DTOs/categories/assettypes";
import { getAssetSubtypes } from "../../DTOs/categories/asset_subtype_dto";

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

    async getAllAssetSubtypes(): Promise<getAssetSubtypes[]> {
        try {
            const query = 'SELECT id, assettype_id, name FROM assetsubtypes';
            const result = await pool.query(query);

            return result.rows.map((row: any) => ({
                id: row.id,
                assettype_id: row.assettype_id,
                name: row.name
            }));
        } catch (error: any){
            throw new Error (`Error al obtener las sub categorías ${error.message}`);
        }
    }
}