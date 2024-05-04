import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import logo from "../images/logo.jpeg";

export default function NavBarLoggedIn() {
  const [isOpen, setIsOpen] = useState(false);

  function toggleNavBar() {
    setIsOpen(!isOpen);
  }
  const navigate = useNavigate();
  function logout() {
    navigate("../pages/Login.jsx");
    localStorage.clear();
    const refresh = setTimeout(() => {
      window.location.reload();
    }, 100);
    return () => clearTimeout(refresh);
  }
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
              <Link
                className="nav-link text-light"
                onClick={logout}
                to="../pages/Login.jsx"
              >
                Logout
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}
