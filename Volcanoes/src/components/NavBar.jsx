import { Link } from "react-router-dom";
import { useState } from "react";
import logo from "../images/logo.jpeg";

export default function NavBar() {
  // State for managing hamburger menu
  const [isOpen, setIsOpen] = useState(false);

  // function that handles the state
  function toggleNavBar() {
    setIsOpen(!isOpen);
  }
  // The JSX for the nav bar
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container-fluid">
        <Link to={"/"} className="navbar-brand">
          <img src={logo} width={50}></img>
          Volcano Sight
        </Link>
        <button className="navbar-toggler" type="button" onClick={toggleNavBar}>
          <span className="navbar-toggler-icon"></span>
        </button>
        <div
          className={`collapse navbar-collapse ${isOpen ? "show" : ""}`}
          id="navbarSupportedContent"
        >
          <ul className="navbar-nav ms-auto">
            <li className="nav-item p-2">
              <Link className="nav-link text-light" to="/">
                Home
              </Link>
            </li>
            <li className="nav-item p-2">
              <Link
                className="nav-link text-light"
                to="../pages/VolcanoList.jsx"
              >
                Volcano List
              </Link>
            </li>
            <li className="nav-item p-2">
              <Link className="nav-link text-light" to="../pages/Login.jsx">
                Login
              </Link>
            </li>
            <li className="nav-item p-2">
              <Link className="nav-link text-light" to="../pages/Register.jsx">
                Register
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}
