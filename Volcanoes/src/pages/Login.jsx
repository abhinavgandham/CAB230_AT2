/* eslint-disable react/prop-types */
/* eslint-disable react/no-unescaped-entities */
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";
import { useState } from "react";
import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

const API_URL = "http://4.237.58.241:3000";

export default function Login() {
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState(null);
  const [password, setPassword] = useState("");
  const [emailEntered, setEmailEntered] = useState(null);
  const [passwordEntered, setPasswordEntered] = useState(null);
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
          console.log(res);
          setInCorrect("Incorrect email or password");
          throw new Error("Incorrect email or password");
        }
        return res.json();
      })
      .then((data) => {
        const token = data.token;
        localStorage.setItem("token", token);

        navigate("/");
        const refresh = setTimeout(() => {
          window.location.reload();
        }, 100);
        return () => clearTimeout(refresh);
      });
  }
  function validateEmail(e) {
    const { value } = e.target;
    const regex = /\S+@\S+\.\S+/;

    if (regex.test(value) || value === "") {
      setEmailError(null);
    } else {
      setEmailError(
        "Please enter a valid email address such as 'username@example.com'"
      );
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
      <div
        className="container mt-5"
        style={{ maxWidth: "800px", margin: "auto" }}
      >
        <div className="border border-danger bg-dark text-light border-5 rounded shadow p-4">
          <h1 className="text-center">Login</h1>
          <EmailandPasswordInput
            email={email}
            validateEmail={validateEmail}
            setEmailEntered={setEmailEntered}
            emailEntered={emailEntered}
            emailError={emailError}
            password={password}
            validatePassword={validatePassword}
            setPasswordEntered={setPasswordEntered}
            passwordEntered={passwordEntered}
            passwordError={passwordError}
          />
          <LoginButton login={login} />

          <p className="text-center mt-5">
            Don't have an account?{" "}
            <Link className="text-danger" to={"../pages/Register.jsx"}>
              Register
            </Link>
          </p>
        </div>
      </div>
      {inCorrect ? (
        <Message message={"Incorrect email or password"} />
      ) : passwordError ? (
        <Message message={"There was an error"} />
      ) : null}
      <Footer />
    </div>
  );
}

function EmailandPasswordInput({
  email,
  validateEmail,
  setEmailEntered,
  emailEntered,
  emailError,
  password,
  validatePassword,
  setPasswordEntered,
  passwordEntered,
  passwordError,
}) {
  return (
    <div className="form-group d-flex flex-column align-items-center">
      <label className="mt-5">Email</label>
      <input
        type="email"
        className="form-control-lg w-50 mt-2"
        placeholder="username@example.com"
        value={email}
        onChange={validateEmail}
        onBlur={() => {
          setEmailEntered(true);
        }}
        onFocus={() => {
          setEmailEntered();
        }}
      />
      {emailEntered ? <>{emailError}</> : null}
      <label className="mt-5">Password</label>
      <input
        type="password"
        className="form-control-lg w-50 mt-2"
        required
        minLength={8}
        placeholder="*********"
        value={password}
        onChange={validatePassword}
        onBlur={() => {
          setPasswordEntered(true);
        }}
        onFocus={() => {
          setPasswordEntered(null);
        }}
      />
      {passwordEntered ? <>{passwordError}</> : null}
    </div>
  );
}

function LoginButton({ login }) {
  return (
    <div className="text-center">
      <button
        type="submit"
        className="btn btn-danger w-50 mt-5 fs-5"
        onClick={login}
      >
        Login
      </button>
    </div>
  );
}

function Message({ message }) {
  const [messageVisible, setMessageVisible] = useState(false);

  useEffect(() => {
    setMessageVisible(true);
    const displayTimer = setTimeout(() => {
      setMessageVisible(false);
    }, 5000);
    return () => clearTimeout(displayTimer);
  }, [message]);
  return messageVisible ? <h2 className="text-center">{message}</h2> : null;
}
