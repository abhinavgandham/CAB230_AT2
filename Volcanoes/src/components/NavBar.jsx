import { Link } from "react-router-dom";

export default function NavBar() {
  return (
    <ul className="navbar list-unstyled">
      <h1>Volcano Search</h1>
      <li className="nav-item">
        <Link to="/" className="nav-link">
          Home
        </Link>
      </li>
      <li className="nav-item">
        <Link to={"./VolcanoList.jsx"} className="nav-link">
          Volcano List
        </Link>
      </li>
      <li className="nav-item">
        <a className="nav-link">Login</a>
      </li>
      <li className="nav-item">
        <a className="nav-link">Register</a>
      </li>
    </ul>
  );
}
