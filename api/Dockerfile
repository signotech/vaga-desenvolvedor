FROM node:18.12-alpine
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci
COPY . .
EXPOSE 3001
CMD [ "sh", "-c", "npm run db:reset ; npm start" ]
