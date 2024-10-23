export class Maintenance {
    id?: number;
    asset_id!: number;  // Relación con Asset
    maintenance_date!: Date;
    description!: string;
    maintenance_type!: 'Preventive' | 'Corrective';
    responsible_id!: number;  // Relación con ResponsiblePerson
    observations!: string;
    cost!: number;
}