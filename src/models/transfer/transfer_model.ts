export class Transfer {
    id?: number;
    asset_id!: number;  // Relación con Asset
    origin_branch_id!: number;  // Relación con Branch (sucursal de origen)
    destination_branch_id!: number;  // Relación con Branch (sucursal de destino)
    transfer_date!: Date;
    responsible_id!: number;  // Relación con ResponsiblePerson
    observations!: string;
    status!: 'In Progress' | 'Completed';
}