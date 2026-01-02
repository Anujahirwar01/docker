# Frontend Dockerfile - Instructions to build the React container image

# Multi-stage build for optimized production image
# Stage 1: Build the React application
FROM node:18-alpine as builder

# Set working directory inside container
WORKDIR /app

# Copy package files for dependency installation
COPY package*.json ./

# Install dependencies
# Using npm ci for faster, reliable builds in production
RUN npm ci

# Copy application source code
COPY . .

# Build the React application for production
# This creates optimized static files in /app/build
RUN npm run build

# Stage 2: Production server
FROM node:18-alpine

# Install serve package globally to serve static files
RUN npm install -g serve

# Set working directory
WORKDIR /app

# Copy built application from builder stage
COPY --from=builder /app/build ./build

# EXPOSE: Document that container listens on port 3000
EXPOSE 3000

# CMD: Start the production server
# serve -s serves static files with SPA (Single Page App) routing
CMD ["serve", "-s", "build", "-l", "3000"]

# Alternative for development (uncomment if needed):
# FROM node:18-alpine
# WORKDIR /app
# COPY package*.json ./
# RUN npm install
# COPY . .
# EXPOSE 3000
# CMD ["npm", "start"]