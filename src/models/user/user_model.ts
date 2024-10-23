export class User {
  id?: number;
  username!: string;
  role_id!: number;  // Relación con Role
  email!: string;
  password!: string;
}