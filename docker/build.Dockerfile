# Build stage
FROM node:20-alpine AS builder
WORKDIR /app
RUN npm install -g pnpm

COPY package.json pnpm-lock.yaml* ./
RUN pnpm install --frozen-lockfile

COPY . .
RUN pnpm build

# Runtime stage
FROM node:20-alpine
WORKDIR /app
RUN npm install -g pnpm

COPY package.json pnpm-lock.yaml* ./
RUN pnpm install --prod --frozen-lockfile

COPY .env .
COPY --from=builder /app/dist ./dist

ENV PORT=8000
EXPOSE 8000

CMD ["node", "dist/main.js"]
