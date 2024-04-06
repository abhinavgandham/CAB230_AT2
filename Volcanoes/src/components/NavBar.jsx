import { Link } from "react-router-dom";

export default function NavBar() {
  return (
    <ul className="navbar list-unstyled">
      <h1>Volcano Search</h1>
      <li className="nav-item">
        <Link className="nav-link" to="/">
          Home
        </Link>
      </li>
      <li className="nav-item">
        <Link className="nav-link" to={"../pages/VolcanoList.jsx"}>
          Volcano List
        </Link>
      </li>
      <li className="nav-item">
        <Link className="nav-link" to={"../pages/Login.jsx"}>
          Login
        </Link>
      </li>
      <li className="nav-item">
        <Link className="nav-link" to={"../pages/Register.jsx"}>
          Register
        </Link>
      </li>
    </ul>
  );
}
