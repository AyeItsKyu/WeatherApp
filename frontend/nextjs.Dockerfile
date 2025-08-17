# FROM node:22.16.0-alpine AS builder

# WORKDIR /app

# COPY ./app/package.json ./app/package-lock.json ./
# RUN npm install
# COPY ./app .
# RUN npm run build

# FROM node:22.16.0-alpine
# WORKDIR /app
# COPY --from=builder /app/next.config.mjs ./next.config.mjs
# COPY --from=builder /app/public ./public
# COPY --from=builder /app/.next ./.next
# COPY --from=builder /app/node_modules ./node_modules
# COPY --from=builder /app/package.json ./package.json

# CMD ["npm", "start"]

FROM node:22.16.0-alpine

WORKDIR /app

COPY ./app/package.json ./app/package-lock.json ./
RUN npm install
COPY ./app .

CMD ["npm", "run", "dev"]