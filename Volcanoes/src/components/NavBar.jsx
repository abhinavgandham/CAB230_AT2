import { Link } from "react-router-dom";

export default function NavBar() {
  return (
    <ul className="navbar bg-dark  list-unstyled">
      <h1>
        <Link to={"/"} className="text-light text-decoration-none">
          Volcano Search
        </Link>
      </h1>
      <li className="nav-item">
        <Link className="nav-link text-light" to="/">
          Home
        </Link>
      </li>
      <li className="nav-item">
        <Link className="nav-link text-light" to={"../pages/VolcanoList.jsx"}>
          Volcano List
        </Link>
      </li>
      <li className="nav-item">
        <Link className="nav-link text-light" to={"../pages/Login.jsx"}>
          Login
        </Link>
      </li>
      <li className="nav-item">
        <Link className="nav-link text-light" to={"../pages/Register.jsx"}>
          Registers
        </Link>
      </li>
    </ul>
  );
}
