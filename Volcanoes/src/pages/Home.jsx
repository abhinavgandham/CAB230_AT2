import NavBar from "../components/NavBar";
import Footer from "../components/Footer";
import NavBarLoggedIn from "../components/NavBarLoggedIn";
import { Link } from "react-router-dom";

// eslint-disable-next-line react/prop-types
export default function Home({ isLoggedIn }) {
  return (
    <div>
      {isLoggedIn ? <NavBarLoggedIn /> : <NavBar />}
      <section className="container-fluid">
        <h1 className="display-5 bg-light fw-bold text-center">
          Welcome to Volcano Sight
        </h1>
        <img
          src="../../src/images/volcano1.jpeg"
          className="img-fluid"
          alt="Image of volcano"
          width={2000}
        />
        <div className="text-center mt-5">
          {!isLoggedIn ? (
            <Link to={"../pages/Login.jsx"} className="mx-2">
              <button className="btn btn-danger fs-4">Sign In</button>
            </Link>
          ) : null}
          <Link to={"../pages/VolcanoList.jsx"} className="mx-2">
            <button className="btn btn-danger fs-4">Start exploring</button>
          </Link>
        </div>
      </section>
      <Footer />
    </div>
  );
}
