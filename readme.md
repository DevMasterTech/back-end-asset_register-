# Control Total de Activos

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

   git clone <https://github.com/DevMasterTech/back-end-asset_register-.git>
   cd control-total-activos

2. Instalar dependencias:
   ```bash
   npm install
   ```

3. Configurar variables de entorno:
   - Crear un archivo `.env` en la raíz del proyecto con la siguiente estructura:
     ```env
        DB_HOST= ""
        DB_PORT= ""
        DB_USER= ""
        DB_PASSWORD= ""
        DB_NAME= ""
        PORT= ""
        JWT_SECRET= ""

    # Si se trabaja con la rama feature/addAssets utilizar el esquema de variables de entorno anterior
    # Si se trabaja con la rama asset-prismaORM trabajar con el siguiente esquema de variables de entorno

        DATABASE_URL=""
        JWT_SECRET= ""
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

La aplicación gestiona activos con una base de datos PostgreSQL, modelada con Prisma. Los principales modelos incluyen:

- **Asset**: Representa los activos con atributos como nombre, estado, especificaciones, método de depreciación, etc.  
- **Branch**: Sucursales donde se encuentran los activos.  
- **Maintenance**: Registros de mantenimiento de activos.  
- **Transfer**: Historial de transferencias de activos entre sucursales.  
- **User y Role**: Gestión de usuarios y roles para el sistema.  
- **ResponsiblePerson**: Personas responsables de los activos.  

## Funcionalidades

- **Gestión de activos:** Registrar, actualizar y eliminar activos.  
- **Historial de mantenimiento:** Registrar mantenimientos realizados a los activos.  
- **Transferencias entre sucursales:** Control de movimientos de activos entre sedes.  
- **Cálculo de depreciación:** Aplicación de métodos contables para depreciación de activos.  
- **Autenticación y control de acceso:** Seguridad basada en JWT y roles de usuario.  
