export class Asset {
    id?: number;
    name!: string;
    description!: string;
    asset_type_id!: number;  // Relación con AssetType
    branch_id!: number;  // Relación con Branch
    responsible_id!: number;  // Relación con ResponsiblePerson
    value!: number;
    status!: 'Active' | 'Maintenance' | 'Damaged' | 'Retired';
    specifications: any;  // JSONB
    registration_date!: Date;
    lifespan!: number;
    depreciation_method!: 'Straight-line' | 'Declining balance';
}
