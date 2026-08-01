FROM oven/bun:1 AS builder
WORKDIR /app
COPY package.json ./
RUN bun install

FROM oven/bun:1-slim
WORKDIR /app
COPY --from=builder /app/node_modules ./node_modules
COPY . .
EXPOSE 9050
CMD ["bun", "run", "server.js"]
