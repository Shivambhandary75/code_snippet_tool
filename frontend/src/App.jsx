import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Home from "./pages/Home";
import CreateCodePage from "./components/CreateCodePage";

function App() {
  return (
    <Router>
   

      <div >
        <Routes>
          <Route path="/" element={<Home/>} />
          <Route path="/create" element={<CreateCodePage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
