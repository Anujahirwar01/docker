@echo off
REM start.bat - Windows batch script to start the application

echo 🐳 MERN Docker Tutorial - Starting Application
echo =============================================

REM Check if Docker is installed
docker --version >nul 2>&1
if %errorlevel% neq 0 (
    echo ❌ Docker is not installed. Please install Docker Desktop first.
    pause
    exit /b 1
)

REM Check if Docker Compose is installed
docker-compose --version >nul 2>&1
if %errorlevel% neq 0 (
    echo ❌ Docker Compose is not installed. Please install Docker Compose first.
    pause
    exit /b 1
)

REM Parse arguments
if "%1"=="dev" goto development
if "%1"=="development" goto development
if "%1"=="prod" goto production
if "%1"=="production" goto production
if "%1"=="detached" goto detached
if "%1"=="-d" goto detached

REM Default to production if no argument provided
goto production

:development
echo 🛠️ Starting in DEVELOPMENT mode with hot reload...
docker-compose -f docker-compose.yml -f docker-compose.dev.yml up --build
goto end

:production
echo 🚀 Starting in PRODUCTION mode...
docker-compose up --build
goto end

:detached
echo 🔄 Starting in DETACHED mode (background)...
docker-compose up --build -d
echo ✅ Services started in background!
echo 📊 View logs: docker-compose logs -f
echo 🛑 Stop services: docker-compose down
pause
goto end

:end
echo.
echo 📱 Frontend: http://localhost:3000
echo 🔧 Backend:  http://localhost:5000
echo 🗄️ MongoDB:  mongodb://localhost:27017
pause