FROM node:18.12-alpine AS build
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci
COPY . .
EXPOSE 3000
CMD [ "npm", "run", "dev", "--", "--host", "--port", "3000" ]
