import NavBar from "../components/NavBar";
import Footer from "../components/Footer";
import { useState } from "react";

export default function Login() {
  const [emailError, setEmailError] = useState(null);

  function handleEmailError(email) {
    const emailFormat = /^\S+@\S+\.\S{2,}$/;
    const isValid = emailFormat.test(email);
    return !isValid;
  }

  return (
    <div>
      <NavBar />
      <h1 className="text-center">Login</h1>
      <div className="form-group d-flex flex-column align-items-center">
        <label className="mt-5">Email</label>
        <input
          type="email"
          className="form-control-lg w-25 flex-row mt-2"
          onChange={(e) => {
            if (handleEmailError) {
              setEmailError("Incorrect format");
            } else {
              setEmailError(null);
            }
            setEmail(e.target.value);
          }}
        />
        {emailError != null ? <EmailError error={emailError} /> : null}
        <label className="mt-5">Password</label>
        <input
          type="password"
          className="form-control-lg w-25 mt-2"
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit" className="btn btn-danger mt-5">
          Login
        </button>
      </div>
      <Footer />
    </div>
  );
}

// eslint-disable-next-line react/prop-types
function EmailError({ error }) {
  return <h2>{error}</h2>;
}
