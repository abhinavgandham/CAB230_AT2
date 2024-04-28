import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

export default function NavBarLoggedIn() {
  const navigate = useNavigate();
  function logout() {
    localStorage.clear();
    navigate("../pages/Login.jsx");
  }
  return (
    <ul className="navbar bg-dark  list-unstyled">
      <h1>
        <Link to={"/"} className="text-light text-decoration-none">
          Volcano Sight
        </Link>
      </h1>
      <li className="nav-item mx-auto">
        <Link className="nav-link text-light" to="/">
          Home
        </Link>
      </li>
      <li className="nav-item mx-auto">
        <Link className="nav-link text-light" to={"../pages/VolcanoList.jsx"}>
          Volcano List
        </Link>
      </li>
      <li className="nav-item mx-auto">
        <Link className="nav-link text-light" to={"/"} onClick={logout}>
          Logout
        </Link>
      </li>
    </ul>
  );
}
