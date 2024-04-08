import NavBar from "../components/NavBar";
import Footer from "../components/Footer";

export default function Login() {
  return (
    <div>
      <NavBar />
      <h1 className="text-center">Login</h1>
      <div className="form-group d-flex flex-column align-items-center">
        <label className="mt-5">Email</label>
        <input type="email" className="form-control-lg w-25 flex-row mt-2" />
        <label className="mt-5">Password</label>
        <input type="password" className="form-control-lg w-25 mt-2" />
        <button type="submit" className="btn btn-danger mt-5">
          Login
        </button>
      </div>
      <Footer />
    </div>
  );
}
