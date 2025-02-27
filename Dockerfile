# Usa una imagen base de Node.js
FROM node:20

# Configura el directorio de trabajo en el contenedor
WORKDIR /app

# Copia los archivos package.json y package-lock.json (o yarn.lock)
COPY package*.json ./

# Instala las dependencias
RUN npm install

# Copia el resto de la aplicación
COPY . .

# Exponemos el puerto en el que nuestra app escuchará
EXPOSE 3000

# Comando para iniciar la aplicación
CMD ["npm", "start"]