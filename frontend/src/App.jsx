import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Home from "./pages/Home";
import { ThemeProvider } from "./context/ThemeContext";

function App() {
  return (
    <ThemeProvider>
      <Router>
        {/* <nav className="p-4 bg-gray-800 text-white flex gap-4">
          <Link to="/">Dashboard</Link>

        </nav> */}

        <div className="">
          <Routes>
            <Route path="/" element={<Home/>} />
          </Routes>
        </div>
      </Router>
    </ThemeProvider>
  );
}

export default App;
