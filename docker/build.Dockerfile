# Build stage
FROM node:20-alpine AS builder
WORKDIR /app
RUN npm install -g pnpm

COPY package.json ./
RUN pnpm install --no-frozen-lockfile --ignore-scripts

COPY . .
RUN pnpm build

# Runtime stage
FROM node:20-alpine
WORKDIR /app
RUN npm install -g pnpm

COPY package.json ./
RUN pnpm install --prod --no-frozen-lockfile --ignore-scripts

COPY --from=builder /app/dist ./dist

ENV PORT=8000
EXPOSE 8000

CMD ["node", "dist/main.js"]
