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
  // Setting logged in status for the user
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  // state for checking if the user has a token
  const [token, setToken] = useState(null);

  // useEffect for handling token and token expiration
  useEffect(() => {
    // Getting the token from localStorage
    const token = localStorage.getItem("token");

    // Getting the token expiration from localStorage
    const expiration = localStorage.getItem("expires_in");

    // Setting the token depending on if the user has one
    setToken(token);

    // Setting the logged in status based on if the user has a token
    setIsLoggedIn(token);

    // Logic for JWT token expiration
    const expirationTimeOut = setTimeout(() => {
      // Setting logged in status to logged out
      setIsLoggedIn(false);

      // Clearing the user's local storage
      localStorage.clear();
    }, Number(expiration) * 1000);
    return () => {
      clearTimeout(expirationTimeOut);
    };
  }, []);
  // Returning the App JSX
  return (
    // Setting up the routes
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
          <Route path="pages/Login.jsx" element={<Login />} />
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
