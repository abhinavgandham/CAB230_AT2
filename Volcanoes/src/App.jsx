import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import VolcanoList from "./pages/VolcanoList";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  return (
    <BrowserRouter>
      <div>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="./pages/VolcanoList.jsx" element={<VolcanoList />} />
          <Route />
          <Route />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
