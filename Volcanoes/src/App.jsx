import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import VolcanoList from "./pages/VolcanoList";
import Login from "./pages/Login";
import Register from "./pages/Register";
import "bootstrap/dist/css/bootstrap.min.css";
import VolcanoMap from "./pages/VolcanoMap";
import { useState } from "react";
import { useEffect } from "react";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [token, setToken] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    setToken(token);
    setIsLoggedIn(token);
  }, []);

  return (
    <BrowserRouter>
      <div>
        <Routes>
          <Route
            path="/"
            element={<Home isLoggedIn={isLoggedIn} token={token} />}
          />
          <Route
            path="pages/VolcanoList.jsx"
            element={<VolcanoList isLoggedIn={isLoggedIn} token={token} />}
          />
          <Route
            path="pages/Login.jsx"
            element={<Login isLoggedIn={isLoggedIn} />}
          />
          <Route path="pages/Register.jsx" element={<Register />} />
          <Route
            path="pages/VolcanoMap.jsx"
            element={<VolcanoMap isLoggedIn={isLoggedIn} />}
          />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
