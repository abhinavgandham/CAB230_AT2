/* eslint-disable react/prop-types */
import { Map, Marker } from "pigeon-maps";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useRef } from "react";

import NavBar from "../components/NavBar";
import NavBarLoggedIn from "../components/NavBarLoggedIn";
import Chart from "chart.js/auto";

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
        <section className="col-md-8 text-center">
          <Map center={center} height={500} width={1100}>
            <Marker anchor={center} />
          </Map>
        </section>
        <VolcanoDetails
          isLoggedIn={isLoggedIn}
          country={country}
          region={region}
          subRegion={subRegion}
          lastErruption={lastErruption}
          summit={summit}
          elevation={elevation}
          latitude={latitude}
          longitude={longitude}
        />
        <div className="col-md-4 col-sm-12">
          {isLoggedIn ? (
            <div>
              <h1 className="text-center mt-5">Population Density</h1>
              <ChartContainer populationData={populations} />
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
}

function VolcanoDetails({
  isLoggedIn,
  country,
  region,
  subRegion,
  lastErruption,
  summit,
  elevation,
  latitude,
  longitude,
}) {
  if (isLoggedIn) {
    return (
      <div className="col-sm-1">
        <p className="fs-6">
          <strong>Country:</strong> {country}
        </p>
        <p className="fs-6">
          <strong>Region:</strong> {region}
        </p>
        <div></div>
        <p className="fs-6">
          <strong>Sub Region:</strong> {subRegion}
        </p>
        <p className="fs-6">
          <strong>Last Eruption:</strong> {lastErruption}
        </p>
        <p className="fs-6">
          <strong>Summit:</strong> {summit}
        </p>
        <p className="fs-6">
          <strong>Elevation:</strong> {elevation}
        </p>
        <p className="fs-6">
          <strong>Latitude:</strong> {latitude}
        </p>
        <p className="fs-6">
          <strong>Longitude:</strong> {longitude}
        </p>
      </div>
    );
  } else {
    return (
      <div className="col-md-11">
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
      </div>
    );
  }
}

// eslint-disable-next-line react/prop-types
function BarChart({ data }) {
  const chartRef = useRef(null);
  const instanceOfChart = useRef(null);

  useEffect(() => {
    if (instanceOfChart.current !== null) {
      instanceOfChart.current.destroy();
    }

    if (chartRef.current && data) {
      instanceOfChart.current = new Chart(chartRef.current, {
        type: "pie",
        data: data,
      });
    }
    return () => {
      if (instanceOfChart.current !== null) {
        instanceOfChart.current.destroy();
      }
    };
  }, [data]);

  return <canvas ref={chartRef} style={{ width: "20px", height: "50px" }} />;
}

function ChartContainer({ populationData }) {
  const data = {
    labels: ["5km", "10km", "30km", "100km"],
    datasets: [
      {
        label: "Population Density",
        data: populationData,
        backgroundColor: ["red", "blue", "green", "yellow"],
        borderColor: "black",
        borderWidth: 2,
      },
    ],
  };

  return (
    <div className="chart-container">
      <BarChart data={data} />
    </div>
  );
}
