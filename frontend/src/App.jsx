import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import ThemeProvider from "./context/ThemeContext";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import CreateCodePage from "./components/CreateCodePage";
import SharedSnippet from "./pages/SharedSnippet";
import ProtectedRoute from "./components/ProtectedRoute";

function AppContent() {
  return (
    <ThemeProvider>
      <Router>
        <div className="">
          <Routes>
            <Route path="/" element={<Home/>} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/create" element={
              <ProtectedRoute>
                <CreateCodePage />
              </ProtectedRoute>
            } />
            <Route path="/edit/:id" element={
              <ProtectedRoute>
                <CreateCodePage />
              </ProtectedRoute>
            } />
            <Route path="/shared/:id" element={<SharedSnippet />} />
            <Route path="/dashboard" element={
              <ProtectedRoute>
                <Home />
              </ProtectedRoute>
            } />
          </Routes>
        </div>
      </Router>
    </ThemeProvider>
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
