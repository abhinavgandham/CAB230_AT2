import { Navbar, NavItem, NavLink } from "reactstrap";
import { BrowserRouter } from "react-router-dom";
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
    <BrowserRouter>
      <Navbar className="navbar nav navbar-light bg-light">
        <NavItem>
          <NavLink className="navbar-brand">Home</NavLink>
        </NavItem>
        <NavItem>
          <NavLink className="navbar-brand">Volcano List</NavLink>
        </NavItem>
        <NavItem>
          <NavLink className="navbar-brand">Register</NavLink>
        </NavItem>
        <NavItem>
          <NavLink className="navbar-brand">Login</NavLink>
        </NavItem>
      </Navbar>
    </BrowserRouter>
  );
}

export default App;
