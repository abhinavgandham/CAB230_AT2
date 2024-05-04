import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

export default function NavBarLoggedIn() {
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
    <ul className="bg-dark list-unstyled d-flex">
      <h1>
        <Link to={"/"} className="text-light text-decoration-none">
          Volcano Sight
        </Link>
      </h1>
      <li className="mt-3" style={{ paddingLeft: "20px" }}>
        <Link className="nav-link text-light" to="/">
          Home
        </Link>
      </li>
      <li className="mt-3" style={{ paddingLeft: "20px" }}>
        <Link className="nav-link text-light" to={"../pages/VolcanoList.jsx"}>
          Volcano List
        </Link>
      </li>
      <li className="mt-3" style={{ paddingLeft: "20px" }}>
        <Link className="nav-link text-light" to={"/"} onClick={logout}>
          Logout
        </Link>
      </li>
    </ul>
  );
}
