import { Map, Marker } from "pigeon-maps";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";

import NavBar from "../components/NavBar";
import NavBarLoggedIn from "../components/NavBarLoggedIn";
import { Bar } from "react-chartjs-2";

// eslint-disable-next-line react/prop-types
export default function VolcanoMap({ isLoggedIn }) {
  const navigate = useNavigate();
  function backToList() {
    navigate("../pages/VolcanoList.jsx");
  }
  const location = useLocation();
  const latitude = location.state.targetLatitude;
  const longitude = location.state.targetLongitude;
  const name = location.state.name;
  const country = location.state.country;
  const region = location.state.region;
  const subRegion = location.state.subRegion;
  const lastErruption = location.state.lastErruption;
  const summit = location.state.summit;
  const elevation = location.state.elevation;
  const populations = location.state.populations;
  const center = [latitude, longitude];
  return (
    <div>
      {isLoggedIn ? <NavBarLoggedIn /> : <NavBar />}
      <h1 className="text-center mt-5">{name}</h1>
      <button className="btn btn-danger fs-4" onClick={backToList}>
        Back
      </button>
      <div className="row justify-content-center mt-4">
        <section className="col-md-10 mb-4 text-center">
          <Map center={center} height={500} width={1100}>
            <Marker anchor={center} />
          </Map>
        </section>
        <h2 className="text-center mb-3">
          <strong>Country:</strong> {country}
        </h2>
        <h2 className="text-center mb-3">
          <strong>Region:</strong> {region}
        </h2>
        <div></div>
        <h2 className="text-center mb-3">
          <strong>Sub Region:</strong> {subRegion}
        </h2>
        <h2 className="text-center mb-3">
          <strong>Last Eruption:</strong> {lastErruption}
        </h2>
        <h2 className="text-center mb-3">
          <strong>Summit:</strong> {summit}
        </h2>
        <h2 className="text-center mb-3">
          <strong>Elevation:</strong> {elevation}
        </h2>
        <h2 className="text-center mb-3">
          <strong>Latitude:</strong> {latitude}
        </h2>
        <h2 className="text-center mb-3">
          <strong>Longitude:</strong> {longitude}
        </h2>
        {isLoggedIn ? (
          <div>
            <h1>Population Density</h1>
            <ChartContainer populationData={populations} />
          </div>
        ) : null}
      </div>
    </div>
  );
}

function Chart({ data }) {
  return (
    <div>
      <Bar data={data} />
    </div>
  );
}

// eslint-disable-next-line react/prop-types
function ChartContainer({ populationData }) {
  const data = {
    labels: ["5km", "10km", "30km", "100km"],
    datasets: [
      {
        label: "Population Density",
        data: populationData,
        backgroundColor: "rgba(75,192,192,0.2)",
        borderColor: "rgba(75,192,192,1)",
        borderWidth: 1,
      },
    ],
  };

  return <Chart data={data} />;
}
