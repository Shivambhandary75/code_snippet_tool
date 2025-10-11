import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Home from "./pages/Home";
import CreateCodePage from "./components/CreateCodePage";
import ThemeProvider from "./context/ThemeContext";

  return (
    <ThemeProvider>
      <Router>
        {/* <nav className="p-4 bg-gray-800 text-white flex gap-4">
          <Link to="/">Dashboard</Link>

        </nav> */}

        <div className="">
          <Routes>
            <Route path="/" element={<Home/>} />
            <Route path="/create" element={<CreateCodePage />} />
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
