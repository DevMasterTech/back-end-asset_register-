# Usa una imagen base de Node.js
FROM node:18

# Establece el directorio de trabajo dentro del contenedor
WORKDIR /api-assets

# Copia los archivos esenciales para la instalación
COPY package*.json ./
RUN npm ci

# Copia el resto del código fuente
COPY . .

# Compila el proyecto de TypeScript a JavaScript
RUN npm run build

# Expone el puerto que usará tu API (puerto 3001)
EXPOSE 3001

# Comando para ejecutar tu aplicación
CMD ["node", "dist/index.js"]
