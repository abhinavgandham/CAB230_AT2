import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import VolcanoList from "./pages/VolcanoList";
import Login from "./pages/Login";
import Register from "./pages/Register";
import "bootstrap/dist/css/bootstrap.min.css";
import VolcanoMap from "./pages/VolcanoMap";

function App() {
  return (
    <BrowserRouter>
      <div>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="pages/VolcanoList.jsx" element={<VolcanoList />} />
          <Route path="pages/Login.jsx" element={<Login />} />
          <Route path="pages/Register.jsx" element={<Register />} />
          <Route path="pages/VolcanoMap.jsx" element={<VolcanoMap />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
