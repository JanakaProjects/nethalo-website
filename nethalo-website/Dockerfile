FROM node:20-alpine
WORKDIR /app
RUN apk add --no-cache python3 make g++
COPY . .
RUN npm install
RUN npm run build
ENV NODE_ENV=production
ENV PORT=3001
ENV DATABASE_URL=/app/data/nethalo.db
RUN mkdir -p /app/data
EXPOSE 3001
CMD ["npx", "tsx", "server/index.ts"]