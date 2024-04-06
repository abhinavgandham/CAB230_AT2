import { Navbar, NavItem, NavLink } from "reactstrap";
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  return (
    <div>
      <NavigationBar />
    </div>
  );
}

function NavigationBar() {
  return (
    <Navbar>
      <NavItem>
        <NavLink>Home</NavLink>
      </NavItem>
      <NavItem>
        <NavLink>Volcano List</NavLink>
      </NavItem>
      <NavItem>
        <NavLink>Register</NavLink>
      </NavItem>
      <NavItem>
        <NavLink>Login</NavLink>
      </NavItem>
    </Navbar>
  );
}

export default App;
