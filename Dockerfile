# ---------- STAGE 1: deps (instala dependencias) ----------
FROM node:20-alpine AS deps
WORKDIR /app

# Copiamos package.json para aprovechar cache
COPY package*.json ./
RUN npm ci --no-audit --no-fund

# ---------- STAGE 2: builder (compila la app) ----------
FROM node:20-alpine AS builder
WORKDIR /app

# Configuracion de build para produccion (sin secretos)
ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1

# Copiamos dependencias desde la etapa anterior
COPY --from=deps /app/node_modules ./node_modules
COPY . .

# Compilamos Next.js (no requiere secretos en build)
RUN npm run build

# Limpiamos devDependencies para reducir peso de node_modules
RUN npm prune --omit=dev --no-audit --no-fund

# ---------- STAGE 3: runner (ejecución ligera) ----------
FROM node:20-alpine AS runner
WORKDIR /app

ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1

# Creamos usuario sin privilegios
RUN addgroup -S appgroup && adduser -S appuser -G appgroup

# Copiamos artefactos necesarios del builder
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
COPY --from=builder /app/package.json ./package.json
COPY --from=builder /app/node_modules ./node_modules

# Puerto de la app
EXPOSE 3000

# Healthcheck a /api/health usando la variable PORT o 3000 por defecto
HEALTHCHECK --interval=30s --timeout=5s --start-period=30s --retries=3 \
	CMD wget -qO- http://127.0.0.1:${PORT:-3000}/api/health || exit 1

# Usuario no root por seguridad
USER appuser

# Comando de inicio
CMD ["npm", "start"]
