/* eslint-disable react/prop-types */
/* eslint-disable react/no-unescaped-entities */
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";

const API_URL = "http://4.237.58.241:3000";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [incorrectError, setIncorrectError] = useState("");
  const navigate = useNavigate();

  const resetErrors = () => {
    setEmailError("");
    setPasswordError("");
    setIncorrectError("");
  };

  const handleLogin = async () => {
    resetErrors();

    const endpoint = `${API_URL}/user/login`;

    try {
      const response = await fetch(endpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        if (email === "" || password === "") {
          setIncorrectError("Both email and password are required");
        } else {
          setIncorrectError("Incorrect email or password");
        }
        throw new Error(errorData.message);
      }

      const data = await response.json();
      const { token } = data;
      const { expires_in } = data;
      localStorage.setItem("token", token);
      console.log(expires_in);

      navigate("/");
      window.location.reload();
    } catch (error) {
      console.error("Login Error:", error.message);
    }
  };

  const validateEmail = (value) => {
    const regex = /\S+@\S+\.\S+/;
    setEmailError(
      regex.test(value) || value === ""
        ? ""
        : "Please enter a valid email address."
    );
    setEmail(value);
  };

  const validatePassword = (value) => {
    // const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{5,8}$/;
    setPasswordError(""); // Reset password error when typing
    if (value.length < 5 || value.length > 8) {
      setPasswordError("Password should be 5-8 characters long");
    } else {
      setPasswordError(""); // Clear error if password meets criteria
    }
    setPassword(value);
  };

  return (
    <div>
      <NavBar />
      <div
        className="container mt-5"
        style={{ maxWidth: "800px", margin: "auto" }}
      >
        <div className="border border-danger bg-dark text-light border-5 rounded shadow p-4">
          <h1 className="text-center">Login</h1>
          <div className="form-group d-flex flex-column align-items-center">
            <label className="mt-5">Email</label>
            <input
              type="email"
              className="form-control-lg w-50 mt-2"
              placeholder="username@example.com"
              value={email}
              onChange={(e) => validateEmail(e.target.value)}
            />
            {emailError && <p className="text-danger mt-2">{emailError}</p>}
            <label className="mt-5">Password</label>
            <input
              type="password"
              className="form-control-lg w-50 mt-2"
              required
              placeholder="*********"
              minLength={5}
              maxLength={8}
              value={password}
              onChange={(e) => validatePassword(e.target.value)}
            />
            {passwordError && (
              <p className="text-danger mt-2">{passwordError}</p>
            )}
          </div>
          <div className="text-center">
            <button
              type="submit"
              className="btn btn-danger w-50 mt-5 fs-5"
              onClick={handleLogin}
            >
              Login
            </button>
          </div>
          <p className="text-center mt-3">
            Don't have an account?{" "}
            <Link className="text-danger" to="../pages/Register.jsx">
              Register
            </Link>
          </p>
          {incorrectError && (
            <p className="text-danger mt-2">{incorrectError}</p>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
}
