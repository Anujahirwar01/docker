# 🚀 Quick Start Guide

## Prerequisites
- Docker Desktop installed and running
- 8GB+ RAM recommended
- Ports 3000, 5000, and 27017 available

## Getting Started (Windows)

### Option 1: Using Batch Script (Recommended)
```cmd
# Double-click start.bat or run in Command Prompt:
start.bat

# For development mode with hot reload:
start.bat dev

# For background mode:
start.bat detached
```

### Option 2: Using Docker Compose Directly
```cmd
# Production mode (optimized builds):
docker-compose up --build

# Development mode (hot reload):
docker-compose -f docker-compose.yml -f docker-compose.dev.yml up --build

# Background mode:
docker-compose up --build -d
```

## What Happens When You Start

### 1. Docker Downloads Base Images (First Time Only)
- `node:18-alpine` for frontend and backend
- `mongo:7.0` for database
- Total download: ~500MB

### 2. Docker Builds Custom Images
- **Backend**: Installs npm packages, copies code
- **Frontend**: Builds React production bundle
- Time: 2-5 minutes first run, faster on subsequent runs

### 3. Docker Starts Services
- **MongoDB**: Starts database with sample data
- **Backend**: Express API server starts
- **Frontend**: React app serves from built files

### 4. Services Communicate
- Frontend calls backend API
- Backend connects to MongoDB
- All services use Docker network

## Accessing the Application

Once running, you can access:

- **🌐 Frontend**: http://localhost:3000
  - Main React application
  - User interface to add/view users
  
- **🔧 Backend**: http://localhost:5000
  - API endpoints
  - Health check at `/api/health`
  
- **🗄️ Database**: mongodb://localhost:27017
  - Direct MongoDB access (use MongoDB Compass)

## Expected Output

### Terminal Output
```
✅ Connected to MongoDB
🚀 Server running on port 5000
📡 Health check: http://localhost:5000/api/health
```

### Browser (localhost:3000)
- Welcome page with Docker tutorial
- Form to add new users
- List of existing users (includes 3 sample users)
- Architecture diagram showing services

## Stopping the Application

```cmd
# If running in foreground:
Ctrl + C

# If running in background:
docker-compose down

# To remove all data and start fresh:
docker-compose down -v
```

## Troubleshooting

### Application Won't Start
```cmd
# Check if Docker is running:
docker --version

# Check what's using the ports:
netstat -an | find "3000"
netstat -an | find "5000"
netstat -an | find "27017"
```

### Cannot Access Application
- Wait 2-3 minutes for all services to fully start
- Check Docker Desktop dashboard for running containers
- Try refreshing the browser page

### Database Connection Issues
- MongoDB takes longest to start (~30 seconds)
- Check logs: `docker-compose logs mongo`
- Ensure no other MongoDB instance is running

### Performance Issues
- Ensure Docker Desktop has enough resources
- Close other applications if running low on memory
- First run is always slower due to downloads

## Development Workflow

### Making Code Changes

**Frontend Changes** (Development Mode):
1. Edit files in `frontend/src/`
2. Changes auto-reload in browser
3. No need to restart Docker

**Backend Changes** (Development Mode):
1. Edit files in `backend/`
2. Nodemon auto-restarts server
3. Check terminal for restart confirmation

**Configuration Changes**:
1. Modify `docker-compose.yml`
2. Run `docker-compose up --build`
3. Rebuilds and restarts affected services

## Next Steps

1. **Explore the Code**: Check out the commented files
2. **Make Changes**: Try modifying the React app
3. **Add Features**: Implement user deletion, editing
4. **Learn Docker**: Read `DOCKER_TUTORIAL.md`
5. **Experiment**: Try different Docker commands

## Common Commands Reference

```cmd
# Start services
docker-compose up

# Start in background
docker-compose up -d

# Stop services
docker-compose down

# View logs
docker-compose logs -f

# Restart specific service
docker-compose restart backend

# Access container shell
docker exec -it mern-backend sh

# View running containers
docker ps

# Clean up everything
docker-compose down -v --rmi all
```

## File Structure Overview
```
📁 mern-docker-tutorial/
├── 📁 backend/               # Express.js API
│   ├── 📄 Dockerfile        # Backend container config
│   ├── 📄 package.json      # Node.js dependencies
│   └── 📄 server.js         # Express server code
├── 📁 frontend/              # React application
│   ├── 📄 Dockerfile        # Frontend container config
│   ├── 📄 package.json      # React dependencies
│   └── 📁 src/              # React source code
├── 📄 docker-compose.yml    # Multi-container orchestration
├── 📄 mongo-init.js         # Database initialization
├── 📄 start.bat             # Windows startup script
└── 📄 README.md             # Project documentation
```

Happy learning! 🐳✨