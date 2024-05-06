/* eslint-disable react/prop-types */
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";
import { useState, useEffect } from "react";

export const API_URL = "http://4.237.58.241:3000";
export default function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailEntered, setEmailEntered] = useState(null);
  const [passwordEntered, setPasswordEntered] = useState(null);
  const [emailError, setEmailError] = useState(null);
  const [passwordError, setPasswordError] = useState(null);
  const [accountAlreadyRegistered, setAccountAlreadyRegistered] =
    useState(false);
  const [accountRegisterError, setAccountRegisterError] = useState(false);
  const [accountCreation, setAccountCreation] = useState(false);

  function resetStates() {
    setEmailError(null);
    setPasswordError(null);
    setAccountRegisterError(false);
    setAccountAlreadyRegistered(false);
  }

  function register() {
    resetStates();

    const endPoint = `${API_URL}/user/register`;

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
        if (res.status === 400) {
          setAccountRegisterError(true);
          console.log(res);
          throw new Error("Both email and password are required");
        }
        if (res.status === 409) {
          setAccountAlreadyRegistered(true);
          console.log(res);
          throw new Error("User already exists");
        }
        if (res.ok) {
          console.log(res);
          setAccountCreation(true);
        }
      })
      .catch((e) => console.log(e));
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
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

    if (regex.test(value) || value == "") {
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
        <div className="border border-danger border-5 rounded shadow p-4">
          <h1 className="text-center">Register</h1>
          <div className="d-flex flex-column align-items-center">
            <EmailandPassword
              email={email}
              validateEmail={validateEmail}
              setEmailEntered={setEmailEntered}
              emailEntered={emailEntered}
              emailError={emailError}
              validatePassword={validatePassword}
              setPasswordEntered={setPasswordEntered}
              passwordEntered={passwordEntered}
              passwordError={passwordError}
            />
            <button
              type="submit"
              className="btn btn-danger mt-4"
              onClick={register}
            >
              Register
            </button>
            {accountRegisterError ? (
              <Message message={"Both email and password are required"} />
            ) : accountAlreadyRegistered ? (
              <Message message={"Account already exists"} />
            ) : accountCreation ? (
              <Message message={"Account has been successfully created!"} />
            ) : null}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
function EmailandPassword({
  email,
  validateEmail,
  setEmailEntered,
  emailEntered,
  emailError,
  validatePassword,
  setPasswordEntered,
  passwordEntered,
  passwordError,
}) {
  return (
    <div className="form-group d-flex flex-column align-items-center">
      <label className="mt-3">Email</label>
      <input
        type="email"
        className="form-control-lg w-30 flex-row "
        required
        minLength={8}
        placeholder="username@example.com"
        value={email}
        onChange={validateEmail}
        onBlur={() => {
          setEmailEntered(true);
        }}
        onFocus={() => {
          setEmailEntered(false);
        }}
      />
      {emailEntered ? <>{emailError}</> : null}
      <label className="mt-3">Password</label>
      <input
        type="password"
        className="form-control-lg w-30 "
        required
        minLength={8}
        placeholder="********"
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

function Message({ message }) {
  const [messageVisible, setMessageVisible] = useState(false);

  useEffect(() => {
    setMessageVisible(true);
    const displayTimer = setTimeout(() => {
      setMessageVisible(false);
    }, 5000);
    return () => clearTimeout(displayTimer);
  }, [message]);
  return messageVisible ? (
    <p className="text-center fs-5 mt-2"> {message}</p>
  ) : null;
}
