import { pool } from "../../config/database/db";
import { getAllResponsiblesDto, createResponsableDto } from '../../DTOs/responsibles/responsibles_dto';

export class ResponsiblePersonService {
    async getAllResponsibles(): Promise<getAllResponsiblesDto[]> {
        try {
            
            const query = 'SELECT id, name, code FROM responsiblepersons';
            const result = await pool.query(query);

            return result.rows.map((row: any) => ({
                id: row.id,
                name: row.name,
                code: row.code
            }));

        } catch (error: any) {
            throw new Error (`Error al obtener los encargados: ${error.message}`)
        }
    }

    async createResponsable(createResponsableDto: createResponsableDto): Promise<any> {
        const { name, position, contact, code } = createResponsableDto

        try {
            const query = `
                INSERT INTO responsiblepersons (name, position, contact, code)
                VALUES ($1, $2, $3, $4)
                RETURNING *;
            `;

            const newResponsable = await pool.query(query,[
                name,
                position,
                contact,
                code
            ])

            return newResponsable.rows[0];
        } catch (error: any) {
            throw new Error(`Error al crear activo: ${error.message}`);
        }
    }

    async getAssetsByResponsibleCode(responsible_code: number): Promise<any[]> {
        try {
    
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
                    rp.name AS responsible_person_name,
                    rp.code AS responsible_person_code
                FROM 
                    assets a
                INNER JOIN responsiblepersons rp ON a.responsible_id = rp.id
                WHERE rp.code = $1
            `;
    
            const result = await pool.query(query, [responsible_code]);
    
            return result.rows;
        } catch (error: any) {
            console.error("Error en la consulta SQL:", error);
            throw new Error(`Error al obtener activos por código de responsable: ${error.message}`);
        }
    }
}