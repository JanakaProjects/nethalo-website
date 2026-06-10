# Build stage
FROM node:20-alpine AS builder

WORKDIR /app

# Install build dependencies for native modules
RUN apk add --no-cache python3 make g++

# Copy source
COPY package*.json ./
COPY tsconfig.json ./

# Install dependencies (allow optional)
RUN npm ci --ignore-scripts || npm install --ignore-scripts

# Copy source and build
COPY . .
RUN npm run build

# Production stage
FROM node:20-alpine

WORKDIR /app

# Install build tools for bcryptjs
RUN apk add --no-cache python3 make g++

# Copy package files
COPY package*.json ./

# Install production dependencies
RUN npm install --omit=dev --ignore-scripts

# Copy built assets from builder
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/server ./server

# Create data directory for SQLite
RUN mkdir -p /app/data

ENV NODE_ENV=production
ENV PORT=3001
ENV DATABASE_URL=/app/data/nethalo.db

EXPOSE 3001

CMD ["npx", "tsx", "server/index.ts"]