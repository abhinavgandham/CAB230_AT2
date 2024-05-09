/* eslint-disable react/prop-types */
/* eslint-disable react/no-unescaped-entities */
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";

const API_URL = "http://4.237.58.241:3000";

// ---------The Login page---------------
export default function Login() {
  // Setting state for the email
  const [email, setEmail] = useState("");

  // Setting state for the password
  const [password, setPassword] = useState("");

  // Setting starte for any email errors
  const [emailError, setEmailError] = useState("");

  // Setting state for any password errors
  const [passwordError, setPasswordError] = useState("");

  // Setting state for general errors
  const [incorrectError, setIncorrectError] = useState("");

  const navigate = useNavigate();

  // Function that resets the states of all errors
  const resetErrors = () => {
    setEmailError("");
    setPasswordError("");
    setIncorrectError("");
  };

  const handleLogin = async () => {
    // reseting all error states
    resetErrors();

    const endpoint = `${API_URL}/user/login`;

    try {
      // Fetching the endpoint
      const response = await fetch(endpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        // Sending the email and password
        body: JSON.stringify({ email, password }),
      });

      // Logic for if the response is not successful
      if (!response.ok) {
        const errorData = await response.json();
        // setting an error if both email and password are blank.
        if (email === "" || password === "") {
          setIncorrectError("Both email and password are required");
        } else {
          // setting an error if email or password is incorrect
          setIncorrectError("Incorrect email or password");
        }
        // Throwing an error with the error message
        throw new Error(errorData.message);
      }

      const data = await response.json();

      // Getting the JWT token
      const { token } = data;

      // Getting the token expiration time
      const { expires_in } = data;

      // storing the token in local storage
      localStorage.setItem("token", token);

      // storing the expiration time in local storage
      localStorage.setItem("expires_in", expires_in);

      // navigating back to home page with the user logged in
      navigate("/");

      window.location.reload();
    } catch (error) {
      console.error("Login Error:", error.message);
    }
  };

  // Function that validates the email
  const validateEmail = (value) => {
    const regex = /\S+@\S+\.\S+/;
    setEmailError(
      regex.test(value) || value === ""
        ? ""
        : "Please enter a valid email address."
    );
    setEmail(value);
  };

  // Function that validates the password
  const validatePassword = (value) => {
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
            <p className="text-danger text-center mt-2">{incorrectError}</p>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
}
