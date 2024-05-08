/* eslint-disable react/no-unescaped-entities */
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
        <div className="row mt-5">
          <div className="col-lg-6 d-flex align-items-center justify-content-center">
            <div className="text-center">
              <h1 className="display-5 mt-2 fw-bold">
                Welcome to Volcano Sight
              </h1>
              <p className="p-5 mt-5">
                Discover the world's volcanoes with Volcano Sight. Explore
                fascinating information about volcanoes across different
                countries, all in one place. Whether you're an adventurer or a
                curious enthusiast, start your journey{" "}
                <Link className="text-danger" to={"../pages/VolcanoList.jsx"}>
                  here
                </Link>
              </p>
            </div>
          </div>
          <div className="col-lg-6 d-flex align-items-center justify-content-center">
            <img
              src="../../src/images/volcano.jpeg"
              className="img-fluid"
              style={{ maxHeight: "100%", maxWidth: "100%" }}
              alt="Image of volcano"
            />
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
}
