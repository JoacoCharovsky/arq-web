# ---------- STAGE 1: deps (instala dependencias) ----------
FROM node:20-alpine AS deps
WORKDIR /app

# Copiamos package.json para aprovechar cache
COPY package*.json ./
RUN npm ci

# ---------- STAGE 2: builder (compila la app) ----------
FROM node:20-alpine AS builder
WORKDIR /app

# Copiamos dependencias desde la etapa anterior
COPY --from=deps /app/node_modules ./node_modules
COPY . .

# ---------- VARIABLES DE ENTORNO PARA BUILD ----------
ARG AUTH_SECRET
ARG AUTH_GOOGLE_ID
ARG AUTH_GOOGLE_SECRET
ARG AUTH_GITHUB_ID
ARG AUTH_GITHUB_SECRET
ARG MONGODB_URI
ARG NEXTAUTH_URL
ARG NEXTAUTH_TRUST_HOST

# Las exportamos como ENV para que estén disponibles durante el build
ENV AUTH_SECRET=${AUTH_SECRET}
ENV AUTH_GOOGLE_ID=${AUTH_GOOGLE_ID}
ENV AUTH_GOOGLE_SECRET=${AUTH_GOOGLE_SECRET}
ENV AUTH_GITHUB_ID=${AUTH_GITHUB_ID}
ENV AUTH_GITHUB_SECRET=${AUTH_GITHUB_SECRET}
ENV MONGODB_URI=${MONGODB_URI}
ENV NEXTAUTH_URL=${NEXTAUTH_URL}
ENV NEXTAUTH_TRUST_HOST=${NEXTAUTH_TRUST_HOST}
ENV NODE_ENV=production

# Compilamos Next.js (usa las variables de arriba si las necesita)
RUN npm run build

# Limpiamos devDependencies para reducir peso
RUN npm prune --production --no-audit --no-fund

# ---------- STAGE 3: runner (ejecución ligera) ----------
FROM node:20-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production

# Creamos usuario sin privilegios
RUN addgroup -S appgroup && adduser -S appuser -G appgroup

# Copiamos artefactos necesarios del builder
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
COPY --from=builder /app/package.json ./package.json
COPY --from=builder /app/node_modules ./node_modules

# Variables de runtime
ENV AUTH_SECRET=${AUTH_SECRET}
ENV AUTH_GOOGLE_ID=${AUTH_GOOGLE_ID}
ENV AUTH_GOOGLE_SECRET=${AUTH_GOOGLE_SECRET}
ENV AUTH_GITHUB_ID=${AUTH_GITHUB_ID}
ENV AUTH_GITHUB_SECRET=${AUTH_GITHUB_SECRET}
ENV MONGODB_URI=${MONGODB_URI}
ENV NEXTAUTH_URL=${NEXTAUTH_URL}
ENV NEXTAUTH_TRUST_HOST=${NEXTAUTH_TRUST_HOST}

# Puerto de la app
EXPOSE 3000

# Usuario no root por seguridad
USER appuser

# Comando de inicio
CMD ["node_modules/.bin/next", "start", "-p", "3000"]
