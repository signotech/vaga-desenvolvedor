# Imagem base
FROM node:14-alpine

# Diretório de trabalho dentro do contêiner
WORKDIR /app

# Copiar os arquivos de configuração do projeto para o diretório de trabalho
COPY package.json package-lock.json ./

# Instalar as dependências
RUN npm install

# Copiar o restante dos arquivos do projeto para o diretório de trabalho
COPY . .

# Compilar o projeto
RUN npm run build

# Porta que a aplicação irá expor
EXPOSE 3001

# Comando para iniciar a aplicação
CMD ["npm", "start"]
