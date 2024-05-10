/* eslint-disable react/prop-types */
import { useState } from "react";
import { Link } from "react-router-dom";
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";

const API_URL = "http://4.237.58.241:3000";

export default function Register() {
  // Setting state for the email
  const [email, setEmail] = useState("");
  // Setting state for the password
  const [password, setPassword] = useState("");
  // Setting state for email error
  const [emailError, setEmailError] = useState("");
  // Setting state for password error
  const [passwordError, setPasswordError] = useState("");
  // Setting state for the message popup
  const [feedbackMessage, setFeedbackMessage] = useState("");

  // Function that resets all error
  const resetErrors = () => {
    setEmailError("");
    setPasswordError("");
  };

  // Function that validates the email field
  const validateEmail = (value) => {
    const regex = /\S+@\S+\.\S+/;
    return regex.test(value);
  };

  // Function that validates the password field
  const validatePassword = (value) => {
    const regex =
      /^(?=.*[A-Z])(?=.*[!@#$%^&*()-+=])(?=.*[0-9])(?=.*[a-z]).{5,8}$/;
    return regex.test(value);
  };

  // main logic of register functionality
  const handleRegister = async () => {
    // Resetting all error states
    resetErrors();

    // Setting email error if email not invalid
    if (!validateEmail(email)) {
      setEmailError("Please enter a valid email address.");
      return;
    }

    // Setting password error if password not valid
    if (!validatePassword(password)) {
      setPasswordError(
        "Password should be 5-8 characters long with at least one uppercase letter, one lowercase letter, one special character, and one digit."
      );
      return;
    }

    try {
      // fetching the enpoint
      const response = await fetch(`${API_URL}/user/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        // Posting the email and password
        body: JSON.stringify({
          email,
          password,
        }),
      });

      // Throwing an error if both email and password are not filled out
      if (response.status === 400) {
        throw new Error("Both email and password are required.");
      }
      // Throwing an error if the user already exists
      if (response.status === 409) {
        throw new Error("User already exists.");
      }
      // Displaying success message if registration was successful
      if (response.ok) {
        setFeedbackMessage("Account has been successfully created!");
      }
    } catch (error) {
      // Displaying error messages for the user
      setFeedbackMessage(error.message);
    }
  };

  // Returning the JSX for the register page
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
              minLength={5}
              maxLength={8}
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
