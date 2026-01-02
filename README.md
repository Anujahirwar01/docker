# MERN Stack with Docker

A simple MERN (MongoDB, Express, React, Node.js) application running with Docker containers.

## How Docker is Used

This project uses Docker to run three separate services:

- **Frontend Container**: React app (port 3000)
- **Backend Container**: Express API (port 5000)  
- **Database Container**: MongoDB (port 27017)

## Quick Start

```bash
# Start all containers
docker-compose up --build

# Stop all containers
docker-compose down
```

## Docker Setup

### Individual Containers
- `frontend/Dockerfile` - Builds React app container
- `backend/Dockerfile` - Builds Express API container
- MongoDB uses official Docker image

### Container Orchestration
- `docker-compose.yml` - Connects all services together
- Containers communicate using Docker networking
- Data persists using Docker volumes

## Access the App
- Frontend: http://localhost:3000
- Backend API: http://localhost:5000