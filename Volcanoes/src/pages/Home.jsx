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
        <h1 className="display-5 mt-2 bg-light fw-bold text-center">
          Welcome to Volcano Sight
        </h1>
        <h2>
          Discover the world's volcanoes with Volcano Sight. Explore fascinating
          information about volcanoes across different countries, all in one
          place. Whether you're an adventurer or a curious enthusiast, start
          your journey{" "}
          <Link className="text-danger" to={"../pages/VolcanoList.jsx"}>
            here
          </Link>
        </h2>
        <div className="row mt-5">
          <div className="col-md-6">
            <img
              src="../../src/images/volcano.jpeg"
              className="img-fluid w-100 mt-5"
              alt="Image of volcano"
            />
          </div>
          <div className="col-md-6">
            <img
              src="../../src/images/volcanoTwo.jpeg"
              className="img-fluid w-100 mt-5"
              alt="Another volcano image"
            />
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
}
