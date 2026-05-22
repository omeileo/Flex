###################
# Build Stage
###################
FROM node:20-slim AS builder

# Set up working directory and environment
WORKDIR /app
ENV NODE_OPTIONS="--max-old-space-size=4096"
ENV HUSKY=0

# Install dependencies
# Copy package files first for better layer caching
COPY package*.json ./
RUN npm ci --ignore-scripts

# Copy source code and run initial memory check
COPY . .
RUN node src/shared/scripts/monitoring/monitoring.scripts.js "After npm ci"

# Build application with memory monitoring
RUN chmod +x src/shared/scripts/monitoring/continuousMemoryMonitor.sh && \
    ./src/shared/scripts/monitoring/continuousMemoryMonitor.sh

###################
# Production Stage  
###################
FROM node:20-alpine

# Install production dependencies
RUN apk add --no-cache openssl libc6-compat
WORKDIR /app

# Copy files in order of least to most frequently changed
# 1. Static assets and templates
COPY src/shared/scripts/monitoring ./src/shared/scripts/monitoring
COPY src/shared/email/templates ./src/shared/email/templates

# 2. Build artifacts and dependencies
COPY --from=builder /app/build ./build
COPY --from=builder /app/node_modules ./node_modules

# 3. Configuration files
COPY package*.json ./
COPY prisma ./prisma

# Generate Prisma client and perform final memory checks
RUN npx prisma generate && \
    node src/shared/scripts/monitoring/monitoring.scripts.js "After Prisma Generate" && \
    node src/shared/scripts/monitoring/monitoring.scripts.js "Final Build Stage"

# Start application
CMD ["node", "server.js"]