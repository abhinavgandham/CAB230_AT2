import NavBar from "../components/NavBar";
import Footer from "../components/Footer";
export default function Register() {
  return (
    <div>
      <NavBar />
      <h1 className="text-center">Register</h1>
      <div className="form-group d-flex flex-column align-items-center">
        <label className="mt-3">Firstname</label>
        <input type="text" className="form-control-lg w-25 flex-row " />
        <label className="mt-3">Lastname</label>
        <input type="text" className="form-control-lg w-25 flex-row " />
        <label className="mt-3">Email</label>
        <input type="email" className="form-control-lg w-25 flex-row " />
        <label className="mt-3">Password</label>
        <input type="password" className="form-control-lg w-25 " />
        <button type="submit" className="btn btn-danger mt-5">
          Register
        </button>
      </div>
      <Footer />
    </div>
  );
}
