#!/bin/bash

# VibeCoded Project Startup Script
echo "🚀 Starting VibeCoded Project..."

# Check if MongoDB is running
echo "📊 Checking MongoDB connection..."
if ! pgrep -x "mongod" > /dev/null; then
    echo "⚠️  MongoDB is not running. Please start MongoDB first:"
    echo "   - Windows: net start MongoDB"
    echo "   - macOS: brew services start mongodb-community"
    echo "   - Linux: sudo systemctl start mongod"
    echo ""
    echo "Or install MongoDB if not installed:"
    echo "   - Visit: https://www.mongodb.com/try/download/community"
    echo ""
fi

# Start Backend
echo "🔧 Starting Backend Server..."
cd backend
if [ ! -f .env ]; then
    echo "⚠️  .env file not found. Creating default configuration..."
    echo "MONGO_URL=mongodb://localhost:27017/vibecoded" > .env
    echo "PORT=3000" >> .env
    echo "TOKEN_KEY=your_super_secret_jwt_key_here_change_this_in_production" >> .env
    echo "NODE_ENV=development" >> .env
fi

# Install backend dependencies if needed
if [ ! -d "node_modules" ]; then
    echo "📦 Installing backend dependencies..."
    npm install
fi

# Start backend in background
npm run dev &
BACKEND_PID=$!

# Wait a moment for backend to start
sleep 3

# Start Frontend
echo "🎨 Starting Frontend Server..."
cd ../frontend

# Install frontend dependencies if needed
if [ ! -d "node_modules" ]; then
    echo "📦 Installing frontend dependencies..."
    npm install
fi

# Start frontend
npm run dev &
FRONTEND_PID=$!

echo ""
echo "✅ VibeCoded is now running!"
echo ""
echo "🌐 Frontend: http://localhost:5173"
echo "🔧 Backend:  http://localhost:3000"
echo ""
echo "📝 To stop the servers, press Ctrl+C"
echo ""

# Function to cleanup on exit
cleanup() {
    echo ""
    echo "🛑 Stopping servers..."
    kill $BACKEND_PID 2>/dev/null
    kill $FRONTEND_PID 2>/dev/null
    echo "✅ Servers stopped."
    exit 0
}

# Set trap to cleanup on script exit
trap cleanup SIGINT SIGTERM

# Wait for both processes
wait
