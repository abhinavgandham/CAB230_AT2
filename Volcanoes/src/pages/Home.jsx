import NavBar from "../components/NavBar";
import Footer from "../components/Footer";

export default function Home() {
  return (
    <div>
      <NavBar />
      <section className="container-fluid">
        <h1 className="display-5 bg-light fw-bold text-center">
          Welcome to Volcano Search
        </h1>
        <img
          src="../../src/images/volcano.jpeg"
          className="img-fluid"
          alt="Image of volcano"
          width={800}
        />
      </section>
      <Footer />
    </div>
  );
}
