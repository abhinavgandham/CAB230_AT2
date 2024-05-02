import NavBar from "../components/NavBar";
import Footer from "../components/Footer";
import { useState, useEffect } from "react";
// import { Link } from "react-router-dom";

export const API_URL = "http://4.237.58.241:3000";
export default function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [firstNameError, setFirstNameError] = useState(null);
  const [lastNameError, setLastNameError] = useState(null);
  const [emailError, setEmailError] = useState(null);
  const [passwordError, setPasswordError] = useState(null);
  const [accountAlreadyRegistered, setAccountAlreadyRegistered] =
    useState(false);
  const [accountRegisterError, setAccountRegisterError] = useState(false);
  const [accountCreation, setAccountCreation] = useState(false);

  function register() {
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
          throw new Error("Both email and password are required");
        }
        if (res.status === 409) {
          setAccountAlreadyRegistered(true);
          throw new Error("User already exists");
        }
        if (res.ok) {
          setAccountCreation(true);
        }
      })
      .catch((e) => console.log(e));
  }

  function validateFirstName(e) {
    const { value } = e.target;
    const regex = /^[a-zA-Z]+(?: [a-zA-Z]+)?$/;
    if (regex.test(value) || value === "") {
      setFirstNameError(null);
    } else {
      setFirstNameError("Incorrect format");
    }
    setFirstName(value);
  }

  function validateLastName(e) {
    const { value } = e.target;
    const regex = /^[a-zA-Z]+(?: [a-zA-Z]+)?$/;
    if (regex.test(value) || value === "") {
      setLastNameError(null);
    } else {
      setLastNameError("Incorrect format");
    }
    setLastName(value);
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
      <h1 className="text-center mt-5">Register</h1>
      <div className="form-group d-flex flex-column align-items-center">
        <label className="mt-3">Firstname</label>
        <input
          type="text"
          className="form-control-lg w-25 flex-row "
          value={firstName}
          onChange={validateFirstName}
        />
        {firstNameError != null ? <p>Error: {firstNameError}</p> : null}
        <label className="mt-3">Lastname</label>
        <input
          type="text"
          className="form-control-lg w-25 flex-row "
          value={lastName}
          onChange={validateLastName}
        />
        {lastNameError != null ? <p>Error: {lastNameError}</p> : null}
        <label className="mt-3">Email</label>
        <input
          type="email"
          className="form-control-lg w-25 flex-row "
          value={email}
          onChange={validateEmail}
        />
        {emailError != null ? <p>Error: {emailError}</p> : null}
        <label className="mt-3">Password</label>
        <input
          type="password"
          className="form-control-lg w-25 "
          onChange={validatePassword}
        />
        {passwordError != null ? <p>Error: {passwordError}</p> : null}
        <button
          type="submit"
          className="btn btn-danger mt-5"
          onClick={register}
        >
          Register
        </button>
      </div>
      {accountRegisterError ? (
        <Message message={"Both email and password are required"} />
      ) : accountAlreadyRegistered ? (
        <Message message={"Account already exists"} />
      ) : accountCreation ? (
        <Message message={"Account has been successfully created!"} />
      ) : null}
      <Footer />
    </div>
  );
}

// eslint-disable-next-line react/prop-types
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
