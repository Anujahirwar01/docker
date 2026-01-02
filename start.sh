#!/bin/bash

# start.sh - Convenience script to start the application

echo "🐳 MERN Docker Tutorial - Starting Application"
echo "============================================="

# Check if Docker and Docker Compose are installed
if ! command -v docker &> /dev/null; then
    echo "❌ Docker is not installed. Please install Docker first."
    exit 1
fi

if ! command -v docker-compose &> /dev/null; then
    echo "❌ Docker Compose is not installed. Please install Docker Compose first."
    exit 1
fi

# Function to start in production mode
start_production() {
    echo "🚀 Starting in PRODUCTION mode..."
    docker-compose up --build
}

# Function to start in development mode
start_development() {
    echo "🛠️ Starting in DEVELOPMENT mode with hot reload..."
    docker-compose -f docker-compose.yml -f docker-compose.dev.yml up --build
}

# Function to start in detached mode
start_detached() {
    echo "🔄 Starting in DETACHED mode (background)..."
    docker-compose up --build -d
    echo "✅ Services started in background!"
    echo "📊 View logs: docker-compose logs -f"
    echo "🛑 Stop services: docker-compose down"
}

# Parse command line arguments
case "$1" in
    "dev"|"development")
        start_development
        ;;
    "prod"|"production")
        start_production
        ;;
    "detached"|"-d")
        start_detached
        ;;
    *)
        echo "Usage: $0 [dev|prod|detached]"
        echo ""
        echo "Options:"
        echo "  dev        - Start in development mode with hot reload"
        echo "  prod       - Start in production mode (default)"
        echo "  detached   - Start in background (detached mode)"
        echo ""
        echo "Examples:"
        echo "  $0 dev      # Development with hot reload"
        echo "  $0 prod     # Production build"
        echo "  $0 detached # Run in background"
        echo ""
        echo "Starting in production mode (default)..."
        start_production
        ;;
esac