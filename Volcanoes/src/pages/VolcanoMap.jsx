/* eslint-disable react/prop-types */
import { Map, Marker } from "pigeon-maps";
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { useRef } from "react";
import { Link } from "react-router-dom";

import NavBar from "../components/NavBar";
import NavBarLoggedIn from "../components/NavBarLoggedIn";
import Chart from "chart.js/auto";
import arrow from "../images/arrow.png";

// eslint-disable-next-line react/prop-types
export default function VolcanoMap({ isLoggedIn }) {
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
      <h1 className="mt-3 text-center">
        Volcano Name: {""}
        <strong>{name}</strong>
      </h1>
      <div>
        <Link
          className="d-flex align-items-center mb-3 text-danger"
          to={"../pages/VolcanoList.jsx"}
        >
          <img src={arrow} width={30} className="mr-2" alt="Back arrow"></img>
          <p className="mt-3 text-danger">Go Back</p>
        </Link>
      </div>
      <div className="row justify-content-center">
        <section
          className={
            isLoggedIn
              ? "col-lg-4 p-4 border border-dark bg-dark shadow"
              : "col-lg-5 col-md-12 p-4 border border-danger bg-dark shadow"
          }
        >
          <h2 className="text-light text-center">Volcano Location</h2>
          <Map
            center={center}
            zoom={6}
            height={500}
            width={isLoggedIn ? 450 : 570}
          >
            <Marker anchor={center} />
          </Map>
        </section>
        <section
          className={"col-lg-4 border border-danger bg-dark shadow text-light"}
        >
          <h2 className="text-light text-center mt-4">Volcano Details</h2>
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
        </section>
        <div className="col-lg-4">
          {isLoggedIn ? (
            <div className="border border-danger bg-dark text-light">
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
      <div className="text-center mt-5">
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
      <div className="col-md-12 mt-5">
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

  return (
    <canvas
      className="ml-5"
      ref={chartRef}
      style={{ width: "20px", height: "50px" }}
    />
  );
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
