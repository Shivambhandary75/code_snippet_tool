@echo off
echo 🚀 Starting VibeCoded Project...

REM Check if MongoDB is running
echo 📊 Checking MongoDB connection...
netstat -an | findstr :27017 >nul
if "%ERRORLEVEL%"=="1" (
    echo ⚠️  MongoDB is not running. Starting MongoDB...
    echo.
    
    REM Create data directory if it doesn't exist
    if not exist "C:\data\db" (
        echo 📁 Creating MongoDB data directory...
        mkdir "C:\data\db" 2>nul
    )
    
    REM Start MongoDB
    echo 🔧 Starting MongoDB server...
    start "MongoDB Server" mongod --dbpath "C:\data\db"
    
    REM Wait for MongoDB to start
    echo ⏳ Waiting for MongoDB to start...
    timeout /t 5 /nobreak >nul
    
    REM Check if MongoDB started successfully
    netstat -an | findstr :27017 >nul
    if "%ERRORLEVEL%"=="0" (
        echo ✅ MongoDB started successfully!
    ) else (
        echo ❌ Failed to start MongoDB. Please start it manually:
        echo    - Run: start-mongodb.bat
        echo    - Or install MongoDB from: https://www.mongodb.com/try/download/community
        echo.
        pause
        exit /b 1
    )
) else (
    echo ✅ MongoDB is already running!
)

REM Start Backend
echo 🔧 Starting Backend Server...
cd backend

REM Check if .env exists, create if not
if not exist .env (
    echo ⚠️  .env file not found. Creating default configuration...
    echo MONGO_URL=mongodb://localhost:27017/vibecoded > .env
    echo PORT=3000 >> .env
    echo TOKEN_KEY=your_super_secret_jwt_key_here_change_this_in_production >> .env
    echo NODE_ENV=development >> .env
)

REM Install backend dependencies if needed
if not exist node_modules (
    echo 📦 Installing backend dependencies...
    npm install
)

REM Start backend
start "Backend Server" cmd /k "npm run dev"

REM Wait a moment for backend to start
timeout /t 3 /nobreak >nul

REM Start Frontend
echo 🎨 Starting Frontend Server...
cd ../frontend

REM Install frontend dependencies if needed
if not exist node_modules (
    echo 📦 Installing frontend dependencies...
    npm install
)

REM Start frontend
start "Frontend Server" cmd /k "npm run dev"

echo.
echo ✅ VibeCoded is now running!
echo.
echo 🌐 Frontend: http://localhost:5173
echo 🔧 Backend:  http://localhost:3000
echo.
echo 📝 Close the terminal windows to stop the servers
echo.

pause
