# Use specific version for better caching
FROM node:18.19-alpine AS base

# Install dependencies only when needed
FROM base AS deps
RUN apk add --no-cache libc6-compat
WORKDIR /app

# Copy package files for better layer caching
COPY package.json yarn.lock* package-lock.json* pnpm-lock.yaml* ./

# Install dependencies with cache mount for faster rebuilds
RUN --mount=type=cache,target=/root/.npm \
    --mount=type=cache,target=/root/.yarn \
    --mount=type=cache,target=/root/.pnpm-store \
    if [ -f yarn.lock ]; then yarn --frozen-lockfile --cache-folder /root/.yarn; \
    elif [ -f package-lock.json ]; then npm ci --cache /root/.npm; \
    elif [ -f pnpm-lock.yaml ]; then corepack enable pnpm && pnpm i --frozen-lockfile --store-dir /root/.pnpm-store; \
    else echo "Lockfile not found." && exit 1; \
    fi

# Rebuild the source code only when needed
FROM base AS builder
WORKDIR /app

# Copy dependencies from deps stage
COPY --from=deps /app/node_modules ./node_modules
COPY --from=deps /app/package*.json ./

# Copy config files first (change least frequently)
COPY next.config.* ./
COPY tailwind.config.* ./
COPY tsconfig.json ./
COPY postcss.config.* ./

# Copy Prisma schema and generate client
COPY prisma ./prisma/
RUN npx prisma generate

# Copy source code in order of likely change frequency
COPY public ./public/
COPY types ./types/
COPY lib ./lib/
COPY components ./components/
COPY app ./app/

# Copy any remaining files (like README, etc.)
COPY . .

# Disable telemetry for faster builds
ENV NEXT_TELEMETRY_DISABLED=1

# Build with cache mount for Next.js cache
RUN --mount=type=cache,target=/app/.next/cache \
    if [ -f yarn.lock ]; then yarn run build; \
    elif [ -f package-lock.json ]; then npm run build; \
    elif [ -f pnpm-lock.yaml ]; then corepack enable pnpm && pnpm run build; \
    else echo "Lockfile not found." && exit 1; \
    fi

# Production image, copy all the files and run next
FROM base AS runner
WORKDIR /app

ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1

# Create user and group in single layer
RUN addgroup --system --gid 1001 nodejs && \
    adduser --system --uid 1001 nextjs

# Copy files with correct permissions
COPY --from=builder /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs

EXPOSE 3000
ENV PORT=3000
ENV HOSTNAME="0.0.0.0"

CMD ["node", "server.js"]