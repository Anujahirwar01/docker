# 🐳 Docker Tutorial - Understanding Containerization

## What is Docker?
Docker is a platform that packages applications and their dependencies into lightweight, portable containers. Think of containers as standardized shipping containers for software.

## Why Use Docker?
- **Consistency**: "It works on my machine" → "It works everywhere"
- **Isolation**: Applications run independently without conflicts
- **Portability**: Run anywhere Docker is installed
- **Scalability**: Easy to scale up/down based on demand

## Key Docker Concepts

### 1. Images
- **Definition**: Read-only templates used to create containers
- **Think of it as**: A blueprint or recipe for creating containers
- **Example**: `node:18-alpine` is an image with Node.js pre-installed

### 2. Containers
- **Definition**: Running instances of images
- **Think of it as**: A live application created from the blueprint
- **Lifecycle**: Created → Started → Stopped → Removed

### 3. Dockerfile
- **Definition**: Text file with instructions to build an image
- **Key Commands**:
  - `FROM`: Base image to start with
  - `WORKDIR`: Set working directory
  - `COPY`: Copy files from host to container
  - `RUN`: Execute commands during build
  - `EXPOSE`: Document which ports the container uses
  - `CMD`: Default command to run when container starts

### 4. Docker Compose
- **Definition**: Tool for defining multi-container applications
- **Benefits**: 
  - Define entire application stack in one file
  - Start/stop all services with one command
  - Configure networks and volumes easily

## Our MERN Stack Architecture

```
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   React App     │    │   Express API   │    │    MongoDB      │
│   (Frontend)    │◄──►│   (Backend)     │◄──►│   (Database)    │
│   Port: 3000    │    │   Port: 5000    │    │   Port: 27017   │
└─────────────────┘    └─────────────────┘    └─────────────────┘
        │                       │                       │
        └───────────────────────┼───────────────────────┘
                                │
                    ┌─────────────────┐
                    │  Docker Network │
                    │   (mern-network) │
                    └─────────────────┘
```

## Container Communication

### How Containers Talk to Each Other
1. **Service Names**: Use service names as hostnames
   - Frontend calls backend: `http://backend:5000/api`
   - Backend calls database: `mongodb://mongo:27017`

2. **Docker Networks**: All services join the same network
   - Services can communicate using service names
   - Isolated from other Docker applications

3. **Port Mapping**: Expose container ports to host
   - `3000:3000` → Host port 3000 maps to container port 3000
   - Allows access from your browser

## Volume Management

### Types of Data Storage
1. **Named Volumes**: Managed by Docker
   ```yaml
   volumes:
     - mongo_data:/data/db
   ```

2. **Bind Mounts**: Direct folder mapping
   ```yaml
   volumes:
     - ./backend:/app  # Host folder → Container folder
   ```

3. **Anonymous Volumes**: Temporary storage
   ```yaml
   volumes:
     - /app/node_modules
   ```

## Environment Variables

### Configuration Management
```yaml
environment:
  NODE_ENV: production
  PORT: 5000
  MONGO_URL: mongodb://mongo:27017/mern-tutorial
```
- Pass configuration without rebuilding images
- Different values for development/production
- Keep secrets secure

## Development vs Production

### Development Mode
- **Hot Reload**: Code changes reflect immediately
- **Volume Mounting**: Source code synced with container
- **Debug Mode**: Detailed logging and error messages
- **Fast Iteration**: Quick feedback loop

### Production Mode
- **Optimized Builds**: Minified, optimized code
- **No Volume Mounting**: Code baked into image
- **Security**: Minimal attack surface
- **Performance**: Optimized for speed and efficiency

## Common Docker Commands

### Building and Running
```bash
# Build an image
docker build -t my-app .

# Run a container
docker run -p 3000:3000 my-app

# Run in background (detached)
docker run -d -p 3000:3000 my-app
```

### Managing Containers
```bash
# List running containers
docker ps

# List all containers
docker ps -a

# Stop a container
docker stop container_id

# Remove a container
docker rm container_id
```

### Managing Images
```bash
# List images
docker images

# Remove an image
docker rmi image_id

# Pull an image from registry
docker pull node:18-alpine
```

### Docker Compose Commands
```bash
# Start all services
docker-compose up

# Start in background
docker-compose up -d

# Stop all services
docker-compose down

# View logs
docker-compose logs -f

# Build and start
docker-compose up --build
```

## Best Practices

### 1. Image Optimization
- Use Alpine Linux for smaller images
- Multi-stage builds for production
- Order Dockerfile commands by change frequency

### 2. Security
- Don't run as root user
- Use specific image tags (not `latest`)
- Keep images updated
- Don't include secrets in images

### 3. Development Workflow
- Use `.dockerignore` to exclude unnecessary files
- Volume mount source code for hot reload
- Use environment-specific compose files

### 4. Production Deployment
- Use health checks
- Implement proper logging
- Set resource limits
- Use orchestration tools (Kubernetes, Docker Swarm)

## Troubleshooting

### Common Issues and Solutions

1. **Container won't start**
   ```bash
   # Check logs
   docker logs container_name
   
   # Check if port is already in use
   netstat -an | grep :3000
   ```

2. **Cannot connect to database**
   - Check if containers are on same network
   - Verify service names in connection strings
   - Ensure database container is fully started

3. **File changes not reflecting**
   - Check if volumes are properly mounted
   - Restart containers if needed
   - Verify file paths in volume mounts

4. **Permission issues**
   - Check file ownership and permissions
   - May need to adjust user in Dockerfile

### Useful Debugging Commands
```bash
# Execute command in running container
docker exec -it container_name bash

# Check container resource usage
docker stats

# Inspect container configuration
docker inspect container_name

# Check Docker system info
docker system info

# Clean up unused resources
docker system prune
```

## Learning Path

### Beginner
1. ✅ Understand containers vs VMs
2. ✅ Learn basic Dockerfile syntax
3. ✅ Practice building simple images
4. ✅ Understand port mapping

### Intermediate
1. ✅ Multi-container applications with Compose
2. ✅ Volume management and data persistence
3. ✅ Environment variables and configuration
4. ✅ Networking between containers

### Advanced
1. 🎯 Kubernetes orchestration
2. 🎯 CI/CD with Docker
3. 🎯 Security best practices
4. 🎯 Performance optimization

## Next Steps
1. Try modifying the application and see changes
2. Add new features (authentication, file upload)
3. Deploy to cloud platforms (AWS, Azure, GCP)
4. Learn about container orchestration
5. Explore microservices architecture

## Resources
- [Docker Official Documentation](https://docs.docker.com/)
- [Docker Compose Reference](https://docs.docker.com/compose/)
- [Best Practices Guide](https://docs.docker.com/develop/best-practices/)
- [Docker Hub](https://hub.docker.com/) - Public image registry