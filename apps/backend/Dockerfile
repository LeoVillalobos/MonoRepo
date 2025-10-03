FROM node:18-alpine

WORKDIR /usr/src/app

RUN npm config set strict-ssl false

RUN npm install -g pnpm@latest

# Copia dependencias
COPY package.json .
COPY pnpm-lock.yaml .
COPY .npmrc .
RUN pnpm install

# Copia código
COPY . .

# Construye (si usas TypeScript)
RUN pnpm run build

EXPOSE 3000
CMD ["node", "dist/main.js"]
