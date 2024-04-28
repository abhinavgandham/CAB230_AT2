import NavBar from "../components/NavBar";
import Footer from "../components/Footer";
import { useState } from "react";

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
      .then((res) =>
        res.json().then((res) => {
          if (res.ok) {
            window.alert(res.message);
            console.log(res);
            setFirstName("");
            setLastName("");
            setEmail("");
            setPassword("");
          } else {
            window.alert(res.message);
            throw new Error(`${res.message}`);
          }
        })
      )
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
      <Footer />
    </div>
  );
}
