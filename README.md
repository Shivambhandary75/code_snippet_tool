# VibeCoded - Code Snippet Management Platform

A full-stack web application for organizing, managing, and sharing code snippets. Built with React frontend and Node.js backend.

## 🚀 Features

- **User Authentication**: Secure signup/login with JWT tokens
- **Snippet Management**: Create, read, update, delete code snippets
- **Smart Organization**: Organize by language, tags, and favorites
- **Search & Filter**: Find snippets quickly with powerful search
- **Public/Private**: Share snippets publicly or keep them private
- **Modern UI**: Beautiful, responsive design with dark/light themes
- **Real-time Updates**: Instant feedback with toast notifications

## 🛠️ Tech Stack

### Frontend
- **React 19** - Modern React with hooks
- **React Router** - Client-side routing
- **Axios** - HTTP client for API calls
- **Tailwind CSS** - Utility-first CSS framework
- **Lucide React** - Beautiful icons
- **Vite** - Fast build tool and dev server

### Backend
- **Node.js** - JavaScript runtime
- **Express.js** - Web framework
- **MongoDB** - NoSQL database
- **Mongoose** - MongoDB object modeling
- **JWT** - JSON Web Tokens for authentication
- **bcryptjs** - Password hashing
- **Joi** - Data validation
- **CORS** - Cross-origin resource sharing

## 📋 Prerequisites

Before running the application, make sure you have:

- **Node.js** (v16 or higher)
- **MongoDB** (v4.4 or higher)
- **npm** or **yarn**

## 🚀 Quick Start

### Option 1: Using the Startup Script (Recommended)

**For Windows:**
```bash
# Double-click start.bat or run in command prompt
start.bat
```

**For macOS/Linux:**
```bash
# Make the script executable and run
chmod +x start.sh
./start.sh
```

### Option 2: Manual Setup

1. **Clone and navigate to the project:**
   ```bash
   cd vibe_coded_project
   ```

2. **Start MongoDB:**
   ```bash
   # Windows
   net start MongoDB
   
   # macOS
   brew services start mongodb-community
   
   # Linux
   sudo systemctl start mongod
   ```

3. **Start the Backend:**
   ```bash
   cd backend
   npm install
   npm run dev
   ```

4. **Start the Frontend (in a new terminal):**
   ```bash
   cd frontend
   npm install
   npm run dev
   ```

5. **Access the application:**
   - Frontend: http://localhost:5173
   - Backend API: http://localhost:3000

## 🔧 Configuration

### Backend Environment Variables

The `.env` file is automatically created with default values:

```env
MONGO_URL=mongodb://localhost:27017/vibecoded
PORT=3000
TOKEN_KEY=your_super_secret_jwt_key_here_change_this_in_production
NODE_ENV=development
```

**⚠️ Important:** Change the `TOKEN_KEY` to a secure random string in production!

### Frontend Configuration

The frontend automatically connects to the backend at `http://localhost:3000`. No additional configuration needed.

## 📁 Project Structure

```
vibe_coded_project/
├── backend/
│   ├── controllers/          # Route controllers
│   ├── middleware/           # Custom middleware
│   ├── models/              # Database models
│   ├── routes/              # API routes
│   ├── schemas/             # Joi validation schemas
│   ├── utils/               # Utility functions
│   ├── validation/          # Validation rules
│   ├── .env                 # Environment variables
│   ├── package.json
│   └── server.js            # Main server file
├── frontend/
│   ├── src/
│   │   ├── components/      # React components
│   │   ├── contexts/        # React contexts
│   │   ├── pages/           # Page components
│   │   ├── App.jsx          # Main app component
│   │   └── main.jsx         # Entry point
│   ├── package.json
│   └── vite.config.js
├── start.bat               # Windows startup script
├── start.sh                # Unix startup script
└── README.md
```

## 🔌 API Endpoints

### Authentication
- `POST /signup` - User registration
- `POST /login` - User login
- `POST /logout` - User logout

### Snippets
- `GET /api/snippets` - Get user's snippets
- `POST /api/snippets` - Create new snippet
- `GET /api/snippets/:id` - Get specific snippet
- `PUT /api/snippets/:id` - Update snippet
- `DELETE /api/snippets/:id` - Delete snippet
- `PATCH /api/snippets/:id/favorite` - Toggle favorite

### Public Snippets
- `GET /api/snippets/public/shared` - Get public snippets
- `GET /api/snippets/public/shared/:id` - Get specific public snippet

## 🎨 UI Components

- **LandingPage** - Welcome page for non-authenticated users
- **Dashboard** - Main interface for authenticated users
- **CreateCodePage** - Form for creating new snippets
- **Login/Signup** - Authentication forms
- **Header** - Navigation with theme toggle and auth buttons
- **Footer** - Site footer with links

## 🔐 Authentication Flow

1. User signs up or logs in
2. Backend validates credentials and returns JWT token
3. Frontend stores token in localStorage
4. Token is included in all subsequent API requests
5. Backend middleware validates token for protected routes

## 🎯 Usage

1. **Sign Up**: Create a new account with email, username, and password
2. **Login**: Sign in with your credentials
3. **Create Snippets**: Click "Create Snippet" to add new code snippets
4. **Organize**: Use tags, languages, and favorites to organize your snippets
5. **Search**: Use the search bar to find specific snippets
6. **Share**: Make snippets public to share with others

## 🐛 Troubleshooting

### Common Issues

1. **MongoDB Connection Error**
   - **Windows**: Run `start-mongodb.bat` or manually start MongoDB:
     ```bash
     # Create data directory
     mkdir C:\data\db
     
     # Start MongoDB
     mongod --dbpath C:\data\db
     ```
   - **macOS**: `brew services start mongodb-community`
   - **Linux**: `sudo systemctl start mongod`
   - Check the connection string in `.env`

2. **CORS Errors**
   - Backend is configured for `http://localhost:5173`
   - Make sure frontend is running on the correct port

3. **Authentication Issues**
   - Clear localStorage and try logging in again
   - Check if JWT token is expired

4. **Port Already in Use**
   - Backend: Change `PORT` in `.env`
   - Frontend: Modify `vite.config.js`

## 🚀 Deployment

### Backend Deployment
1. Set production environment variables
2. Use a process manager like PM2
3. Set up MongoDB Atlas or production MongoDB
4. Configure reverse proxy (nginx)

### Frontend Deployment
1. Build the project: `npm run build`
2. Deploy to Vercel, Netlify, or similar
3. Update API base URL for production

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License.

## 🙏 Acknowledgments

- React team for the amazing framework
- Tailwind CSS for the utility-first approach
- MongoDB for the flexible database
- All open-source contributors

---

**Happy Coding! 🎉**