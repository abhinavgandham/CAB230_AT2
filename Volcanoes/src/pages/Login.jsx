/* eslint-disable react/no-unescaped-entities */
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const API_URL = "http://4.237.58.241:3000";

export default function Login() {
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState(null);
  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState(null);
  const [inCorrect, setInCorrect] = useState(null);
  const navigate = useNavigate();

  function login() {
    const endPoint = `${API_URL}/user/login`;

    return fetch(endPoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: email,
        password: password,
      }),
    })
      .then((res) => {
        if (!res.ok) {
          setInCorrect("Incorrect email or password");
          throw new Error("Incorrect email or password");
        }
        return res.json();
      })
      .then((data) => {
        console.log(data);
        console.log(data.token);
        const token = data.token;
        localStorage.setItem("token", token);
        navigate("/");
        const refresh = setTimeout(() => {
          window.location.reload();
        }, 1000);
        return () => clearTimeout(refresh);
      });
  }
  function validateEmail(e) {
    const { value } = e.target;
    const regex = /\S+@\S+\.\S+/;

    if (regex.test(value) || value === "") {
      setEmailError(null);
    } else {
      setEmailError("Email is not in correct format");
    }
    setEmail(value);
  }

  function validatePassword(e) {
    const { value } = e.target;
    const regex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{12,}$/;

    if (!regex.test(value) || value == "") {
      setPasswordError(null);
    } else {
      setPasswordError(
        "Password is not in correct format, either password length is greater than 12 characters or some characters are invalid."
      );
    }
    setPassword(value);
  }
  return (
    <div>
      <NavBar />
      <h1 className="text-center mt-5">Login</h1>
      <div className="form-group d-flex flex-column align-items-center">
        <label className="mt-5">Email</label>
        <input
          type="email"
          className="form-control-lg w-25 flex-row mt-2"
          value={email}
          onChange={validateEmail}
        />
        {emailError != null ? <p>Error: {emailError}</p> : null}
        <label className="mt-5">Password</label>
        <input
          type="password"
          className="form-control-lg w-25 flex-row mt-2"
          value={password}
          onChange={validatePassword}
        />
        {passwordError != null ? <p>Error: {passwordError}</p> : null}
        <button type="submit" className="btn btn-danger mt-5" onClick={login}>
          Login
        </button>
      </div>
      <p className="text-center mt-5">
        Don't have an account?{" "}
        <Link to={"../pages/Register.jsx"}>Register</Link>
      </p>
      {!inCorrect ? (
        <p className="text-center mt-5 text-danger display-4">{inCorrect}</p>
      ) : null}
      <Footer />
    </div>
  );
}

// eslint-disable-next-line react/prop-types
