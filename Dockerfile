FROM node:22 AS clientbuilder

# Set working directory
WORKDIR /app

# Copy and build Angular frontend
COPY client ./client
WORKDIR /app/client
RUN npm install && npm run build


FROM node:22-alpine AS builder
WORKDIR /app

ARG GIT_COMMIT
ENV GIT_COMMIT_HASH=$GIT_COMMIT

COPY server .
RUN npm install && npm run build
COPY --from=clientbuilder /app/client/dist/client/browser ./client


FROM node:22-alpine
WORKDIR /app

ARG GIT_COMMIT=dev
ENV GIT_COMMIT_HASH=$GIT_COMMIT

COPY --from=clientbuilder /app/client/dist/client/browser ./client
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/package* ./
RUN npm install --omit=dev
# Expose port and run application
EXPOSE 3000
CMD ["node", "dist/main.js"]
