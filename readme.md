# Control de Activos TechResources

## Descripción
Control Total de Activos es una aplicación diseñada para gestionar el ciclo de vida de activos dentro de una organización. Permite registrar, mantener, transferir y depreciar activos, asegurando un control eficiente y organizado de los bienes.

## Tecnologías Utilizadas

Este proyecto utiliza las siguientes tecnologías:

- **Backend:** Node.js con Express  
- **Base de datos:** PostgreSQL con Prisma ORM  
- **Autenticación:** JSON Web Tokens (JWT)  
- **Seguridad:** bcrypt para el cifrado de contraseñas  
- **Gestión de variables de entorno:** dotenv  
- **Otros:** CORS para manejo de políticas de acceso entre dominios  

## Instalación

1. Clonar el repositorio:

   ```bash
   git clone <https://github.com/DevMasterTech/back-end-asset_register-.git>
   cd control-total-activos
   ```

2. Instalar dependencias:
   ```bash
   npm install
   ```

3. Configurar variables de entorno:
   - Crear un archivo `.env` en la raíz del proyecto con la siguiente estructura:
     ```env
     DB_HOST=""
     DB_PORT=""
     DB_USER=""
     DB_PASSWORD=""
     DB_NAME=""
     PORT=""
     JWT_SECRET=""

     # Si se trabaja con la rama feature/addAssets utilizar el esquema de variables de entorno anterior
     # Si se trabaja con la rama asset-prismaORM trabajar con el siguiente esquema de variables de entorno

     DATABASE_URL=""
     JWT_SECRET=""
     ```

4. Ejecutar migraciones de la base de datos con Prisma:
   ```bash
   npx prisma migrate dev --name init
   ```

5. Iniciar el servidor en modo desarrollo:
   ```bash
   npm run dev
   ```

6. Para ejecutar en producción:
   ```bash
   npm run build
   npm start
   ```

## Modelos de Base de Datos

La aplicación gestiona activos con una base de datos PostgreSQL, modelada con Prisma. A continuación, se describe la estructura de la base de datos:

### **Asset (Activo)**
Representa los activos de la organización.  

| Campo               | Tipo de Dato  | Descripción |
|---------------------|-------------|-------------|
| `id`               | Int (PK)     | Identificador único del activo |
| `name`             | String       | Nombre del activo |
| `description`      | String       | Descripción del activo |
| `asset_subtype_id` | Int (FK)     | Relación con el subtipo de activo |
| `branch_id`        | Int (FK)     | Relación con la sucursal donde está ubicado |
| `responsible_id`   | Int (FK)     | Persona responsable del activo |
| `value`           | Float        | Valor monetario del activo |
| `status`          | Enum         | Estado del activo (Active, Maintenance, Damaged, Retired) |
| `specifications`  | JSON         | Especificaciones técnicas |
| `registration_date` | DateTime   | Fecha de registro del activo |
| `lifespan`        | Int         | Vida útil estimada del activo |
| `depreciation_method` | Enum   | Método de depreciación |

### **Branch (Sucursal)**
Define las sucursales donde están almacenados los activos.

| Campo       | Tipo de Dato | Descripción |
|------------|------------|-------------|
| `id`       | Int (PK)   | Identificador único de la sucursal |
| `name`     | String     | Nombre de la sucursal |
| `address`  | String     | Dirección de la sucursal |
| `city`     | String     | Ciudad donde se encuentra la sucursal |
| `country`  | String     | País donde se encuentra la sucursal |

### **Maintenance (Mantenimiento)**
Registra los mantenimientos realizados a los activos.

| Campo               | Tipo de Dato  | Descripción |
|---------------------|-------------|-------------|
| `id`               | Int (PK)     | Identificador único del mantenimiento |
| `asset_id`         | Int (FK)     | Relación con el activo |
| `maintenance_date` | DateTime     | Fecha del mantenimiento |
| `description`      | String       | Descripción del mantenimiento |
| `maintenance_type` | String       | Tipo de mantenimiento |
| `responsible_id`   | Int (FK)     | Persona responsable del mantenimiento |
| `observations`     | String       | Observaciones del mantenimiento |
| `cost`            | Float        | Costo del mantenimiento |

### **Transfer (Transferencias de Activos)**
Registra los movimientos de activos entre sucursales.

| Campo                  | Tipo de Dato  | Descripción |
|------------------------|-------------|-------------|
| `id`                  | Int (PK)     | Identificador único de la transferencia |
| `asset_id`            | Int (FK)     | Activo transferido |
| `origin_branch_id`    | Int (FK)     | Sucursal de origen |
| `destination_branch_id` | Int (FK)   | Sucursal de destino |
| `transfer_date`       | DateTime     | Fecha de la transferencia |
| `responsible_id`      | Int (FK)     | Persona responsable de la transferencia |
| `observations`        | String       | Observaciones sobre la transferencia |
| `status`              | Enum         | Estado de la transferencia |

### **User y Role (Usuarios y Roles)**
Gestión de usuarios del sistema y sus roles.

| Campo      | Tipo de Dato | Descripción |
|-----------|------------|-------------|
| `id`      | Int (PK)   | Identificador único del usuario |
| `username`| String     | Nombre de usuario |
| `email`   | String (unique) | Correo electrónico del usuario |
| `password` | String    | Contraseña cifrada del usuario |
| `roles`   | Relación   | Relación con los roles |

| Campo  | Tipo de Dato | Descripción |
|--------|------------|-------------|
| `id`   | Int (PK)   | Identificador único del rol |
| `role` | String     | Nombre del rol (admin, usuario, etc.) |
| `users` | Relación  | Relación con los usuarios |

### **Depreciation (Depreciación)**
Calcula la depreciación de los activos.

| Campo                 | Tipo de Dato  | Descripción |
|----------------------|-------------|-------------|
| `id`                | Int (PK)     | Identificador único de la depreciación |
| `asset_id`          | Int (FK)     | Activo asociado a la depreciación |
| `depreciation_value` | Float        | Valor de la depreciación |
| `date`              | DateTime     | Fecha de la depreciación |

## Funcionalidades

- **Gestión de activos:** Registrar, actualizar y eliminar activos.  
- **Historial de mantenimiento:** Registrar mantenimientos realizados a los activos.  
- **Transferencias entre sucursales:** Control de movimientos de activos entre sedes.  
- **Cálculo de depreciación:** Aplicación de métodos contables para depreciación de activos.  
- **Autenticación y control de acceso:** Seguridad basada en JWT y roles de usuario.  
