FROM oven/bun:latest
WORKDIR /app
COPY package.json bun.lock ./
RUN bun install --frozen-lockfile
COPY . .
EXPOSE 4100
ENV NODE_ENV=production
CMD ["bun", "run", "src/index.ts"]
