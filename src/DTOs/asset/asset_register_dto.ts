export class CreateAssetDTO {
    name!: string;
    description!: string;
    asset_subtype_id!: number;
    branch_id!: number;
    responsible_id!: number;
    value!: number;
    status!: 'Active' | 'Maintenance' | 'Damaged' | 'Retired';
    specifications: any;
    registration_date!: Date;
    lifespan!: number;
    depreciation_method!: 'Straight-line' | 'Declining balance';
}