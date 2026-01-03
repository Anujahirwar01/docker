# MERN Stack with Docker

A simple MERN (MongoDB, Express, React, Node.js) application running with Docker containers.

## How Docker is Used

This project uses Docker to run three separate services:

- **Frontend Container**: React app (port 3000)
- **Backend Container**: Express API (port 5000)  
- **Database Container**: MongoDB (port 27017)

## Prerequisites

- **Docker Desktop** installed and running
- At least **8GB RAM** recommended
- Ensure ports **3000**, **5000**, and **27017** are available

## Quick Start

```bash
# Start all containers
docker-compose up --build

# Stop all containers
docker-compose down
```

## Troubleshooting

### 🚨 Error: "The system cannot find the file specified"
If you see this error when running `docker-compose up --build`:
```
error during connect: Get "http://%2F%2F.%2Fpipe%2FdockerDesktopLinuxEngine/v1.47/containers/json?all=1&filters=...": open //./pipe/dockerDesktopLinuxEngine: The system cannot find the file specified.
```

**Solution**: Docker Desktop is not running. Follow these steps:

1. **Start Docker Desktop**:
   - Look for Docker Desktop in your Windows Start Menu
   - Click on "Docker Desktop" to launch it
   - Wait for it to fully start (you'll see a whale icon in your system tray)
   - The icon should be steady (not animated) when Docker is ready

2. **Verify Docker is Running**:
   ```bash
   # Check if Docker is running
   docker --version
   
   # Test Docker connection
   docker ps
   ```

3. **Try Again**:
   ```bash
   docker-compose up --build
   ```

### Version Warning Fix
If you see a warning about `version` being obsolete, you can safely ignore it or remove the version line from docker-compose.yml.

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