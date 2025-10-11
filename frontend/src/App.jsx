import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { AuthProvider, useAuth } from "./contexts/AuthContext";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import ProtectedRoute from "./components/ProtectedRoute";
import { LogOut, User } from "lucide-react";

function AppContent() {
  const { user, logout } = useAuth();

  return (
    <Router>
      <nav className="p-4 bg-gray-800 text-white flex justify-between items-center">
        <div className="flex gap-4">
          <Link to="/" className="hover:text-gray-300">
            Dashboard
          </Link>
        </div>

        <div className="flex items-center gap-4">
          {user ? (
            <>
              <div className="flex items-center gap-2">
                <User className="h-5 w-5" />
                <span>Welcome!</span>
              </div>
              <button
                onClick={logout}
                className="flex items-center gap-2 px-3 py-1 bg-red-600 hover:bg-red-700 rounded-md transition-colors"
              >
                <LogOut className="h-4 w-4" />
                Logout
              </button>
            </>
          ) : (
            <div className="flex gap-2">
              <Link
                to="/login"
                className="px-3 py-1 bg-blue-600 hover:bg-blue-700 rounded-md transition-colors"
              >
                Login
              </Link>
              <Link
                to="/signup"
                className="px-3 py-1 bg-green-600 hover:bg-green-700 rounded-md transition-colors"
              >
                Signup
              </Link>
            </div>
          )}
        </div>
      </nav>

      <div className="p-6">
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />
        </Routes>
      </div>
    </Router>
  );
}

function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}

export default App;
