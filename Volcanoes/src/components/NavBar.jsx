import { Link } from "react-router-dom";

export default function NavBar() {
  return (
    <ul className="navbar bg-dark list-unstyled d-flex justify-content-between align-items-center">
      <h1>
        <Link to={"/"} className="text-light text-decoration-none">
          Volcano Sight
        </Link>
      </h1>
      <li className="nav-item ">
        <Link
          className="nav-link text-light"
          style={{ marginLeft: "5px" }}
          to="/"
        >
          Home
        </Link>
      </li>
      <li className="nav-item " style={{ marginLeft: "-10px" }}>
        <Link
          className="nav-link text-light"
          style={{ marginLeft: "10px" }}
          to={"../pages/VolcanoList.jsx"}
        >
          Volcano List
        </Link>
      </li>
      <li className="nav-item " style={{ marginLeft: "-10px" }}>
        <Link
          className="nav-link text-light"
          style={{ marginLeft: "-10px" }}
          to={"../pages/Login.jsx"}
        >
          Login
        </Link>
      </li>
      <li className="nav-item">
        <Link
          className="nav-link text-light "
          style={{ marginRight: "5px" }}
          to={"../pages/Register.jsx"}
        >
          Register
        </Link>
      </li>
    </ul>
  );
}
