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
        <section className="border border-danger shadow p-4 bg-dark text-light">
          <h5 className="">
            Discover the world's volcanoes with Volcano Sight. Explore
            fascinating information about volcanoes across different countries,
            all in one place. Whether you're an adventurer or a curious
            enthusiast, start your journey{" "}
            <Link className="text-danger" to={"../pages/VolcanoList.jsx"}>
              here
            </Link>
          </h5>
        </section>
        <div className="row">
          <div>
            <img
              src="../../src/images/volcano.jpeg"
              className="img-fluid  w-100 mt-5"
              alt="Image of volcano"
            />
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
}
