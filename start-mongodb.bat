@echo off
echo 🚀 MongoDB Management Script for VibeCoded
echo.

REM Check if MongoDB is already running
netstat -an | findstr :27017 >nul
if %ERRORLEVEL%==0 (
    echo ✅ MongoDB is already running on port 27017
    echo.
    echo To stop MongoDB, run: taskkill /f /im mongod.exe
    echo To restart MongoDB, stop it first and then run this script again
    goto :end
)

echo 📊 Starting MongoDB...
echo.

REM Create data directory if it doesn't exist
if not exist "C:\data\db" (
    echo 📁 Creating MongoDB data directory...
    mkdir "C:\data\db" 2>nul
)

REM Start MongoDB
echo 🔧 Starting MongoDB server...
start "MongoDB Server" mongod --dbpath "C:\data\db"

REM Wait a moment for MongoDB to start
timeout /t 3 /nobreak >nul

REM Check if MongoDB started successfully
netstat -an | findstr :27017 >nul
if %ERRORLEVEL%==0 (
    echo ✅ MongoDB started successfully on port 27017
    echo.
    echo 🌐 MongoDB is now ready for VibeCoded!
    echo 📝 To stop MongoDB: taskkill /f /im mongod.exe
) else (
    echo ❌ Failed to start MongoDB
    echo.
    echo 🔧 Troubleshooting:
    echo 1. Make sure MongoDB is installed
    echo 2. Check if port 27017 is available
    echo 3. Run as administrator if needed
)

:end
echo.
pause
