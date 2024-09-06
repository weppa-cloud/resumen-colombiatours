# Usa una imagen base de Node.js
FROM node:18

# Establece el directorio de trabajo
WORKDIR /usr/src/app

# Instala http-server globalmente
RUN npm install -g http-server

# Copia los archivos de la aplicación al contenedor
COPY . .

# Exponer el puerto 80
EXPOSE 80

# Comando para ejecutar http-server en el puerto 80
CMD [ "http-server", "-p", "80" ]