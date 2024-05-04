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
        <h1 className="display-5 mt-2 bg-light fw-bold text-center">
          Welcome to Volcano Sight
        </h1>
        <div className="row mt-5">
          <div className="col-md-6">
            <img
              src="../../src/images/volcano.jpeg"
              className="img-fluid w-80 mt-5"
              alt="Image of volcano"
            />
          </div>
          <div
            className="
          border border-danger border-5 rounded shadow bg-dark text-light
          col-md-5 mt-5 flex-row justify-content-center 
          align-items-center"
          >
            {!isLoggedIn ? (
              <h2 className="text-center mt-5">
                Click
                <Link to={"../pages/Login.jsx"} className="mx-2 text-danger">
                  here
                </Link>
                to login
              </h2>
            ) : null}
            <h2 className="text-center mt-5">
              Click
              <Link
                to={"../pages/VolcanoList.jsx"}
                className="mx-2 text-danger"
              >
                here
              </Link>
              to start your volcanic adventure!!
            </h2>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
}
