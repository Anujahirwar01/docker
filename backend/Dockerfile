# Backend Dockerfile - Instructions to build the backend container image

# FROM: Specifies the base image to build from
# We use Node.js official image with Alpine Linux (lightweight)
FROM node:18-alpine

# WORKDIR: Sets the working directory inside the container
# All subsequent commands will run from this directory
WORKDIR /app

# COPY package files first (Docker layer caching optimization)
# When package.json doesn't change, Docker reuses the npm install layer
COPY package*.json ./

# RUN: Executes commands during image build
# Install dependencies based on package.json
RUN npm install

# COPY: Copies files from host to container
# Copy the rest of application code
COPY . .

# EXPOSE: Documents which port the container will listen on
# This is just documentation - doesn't actually publish the port
EXPOSE 5000

# CMD: Specifies the default command to run when container starts
# npm start will run "node server.js" as defined in package.json
CMD ["npm", "start"]