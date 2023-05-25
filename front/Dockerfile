# Usar a imagem base do Node.js
FROM node:14

# Definir o diretório de trabalho dentro do contêiner
WORKDIR /app

# Copiar o package.json e package-lock.json para o diretório de trabalho
COPY package*.json ./

# Instalar as dependências do projeto
RUN npm install

# Copiar todos os arquivos do projeto para o diretório de trabalho
COPY . .

# Compilar o aplicativo React
RUN npm run build

# Definir a porta em que o aplicativo será executado
EXPOSE 3000

# Comando para executar o aplicativo
CMD ["npm", "start"]
