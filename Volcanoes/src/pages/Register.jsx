/* eslint-disable react/prop-types */
import { useState } from "react";
import { Link } from "react-router-dom";
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";

const API_URL = "http://4.237.58.241:3000";

export default function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [feedbackMessage, setFeedbackMessage] = useState("");

  const resetErrors = () => {
    setEmailError("");
    setPasswordError("");
  };

  const validateEmail = (value) => {
    const regex = /\S+@\S+\.\S+/;
    return regex.test(value);
  };

  const validatePassword = (value) => {
    const regex =
      /^(?=.*[A-Z])(?=.*[!@#$%^&*()-+=])(?=.*[0-9])(?=.*[a-z]).{5,8}$/;
    return regex.test(value);
  };

  const handleRegister = async () => {
    resetErrors();

    if (!validateEmail(email)) {
      setEmailError("Please enter a valid email address.");
      return;
    }

    if (!validatePassword(password)) {
      setPasswordError(
        "Password should be 5-8 characters long with at least one uppercase letter, one lowercase letter, one special character, and one digit."
      );
      return;
    }

    try {
      const response = await fetch(`${API_URL}/user/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
        }),
      });

      if (response.status === 400) {
        throw new Error("Both email and password are required.");
      }
      if (response.status === 409) {
        throw new Error("User already exists.");
      }
      if (response.ok) {
        setFeedbackMessage("Account has been successfully created!");
      }
    } catch (error) {
      setFeedbackMessage(error.message);
    }
  };

  return (
    <div>
      <NavBar />
      <div
        className="container mt-5"
        style={{ maxWidth: "800px", margin: "auto" }}
      >
        <div className="border border-danger bg-dark text-light border-5 rounded shadow p-4">
          <h1 className="text-center">Register</h1>
          <div className="form-group d-flex flex-column align-items-center">
            <label className="mt-5">Email</label>
            <input
              type="email"
              className="form-control-lg w-50 mt-2"
              required
              minLength={8}
              placeholder="username@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            {emailError && <p className="text-danger mt-2">{emailError}</p>}
            <label className="mt-5">Password</label>
            <input
              type="password"
              className="form-control-lg w-50 mt-2"
              required
              minLength={5} // Adjusted minimum length
              maxLength={8} // Adjusted maximum length
              placeholder="********"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            {passwordError && (
              <p className="text-danger mt-2">{passwordError}</p>
            )}
          </div>
          <div className="text-center">
            <button
              type="submit"
              className="btn btn-danger w-50 mt-5 fs-5"
              onClick={handleRegister}
            >
              Register
            </button>
          </div>
          {feedbackMessage && (
            <p className="text-center fs-5 mt-2">
              {feedbackMessage} {""}
              <Link className="text-danger" to={"../pages/Login.jsx"}>
                Login
              </Link>
            </p>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
}
