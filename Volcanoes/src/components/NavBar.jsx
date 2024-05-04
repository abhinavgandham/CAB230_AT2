import { Link } from "react-router-dom";

export default function NavBar() {
  return (
    <ul className="bg-dark list-unstyled d-flex">
      <h1>
        <Link to={"/"} className="text-light text-decoration-none">
          Volcano Sight
        </Link>
        s
      </h1>
      <li className="mt-3">
        <Link
          className="nav-link text-light"
          style={{ marginLeft: "5px" }}
          to="/"
        >
          Home
        </Link>
      </li>
      s
      <li className="mt-3" style={{ paddingRight: "20px" }}>
        <Link
          className="nav-link text-light mr-3"
          style={{ marginLeft: "10px" }}
          to={"../pages/VolcanoList.jsx"}
        >
          Volcano List
        </Link>
      </li>
      <li className="mt-3" style={{ paddingLeft: "20px" }}>
        <Link
          className="nav-link text-light"
          style={{ marginLeft: "-10px" }}
          to={"../pages/Login.jsx"}
        >
          Login
        </Link>
      </li>
      <li className="mt-3" style={{ paddingLeft: "20px" }}>
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
