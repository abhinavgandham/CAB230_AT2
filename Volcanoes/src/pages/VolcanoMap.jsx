/* eslint-disable react/prop-types */
import { Map, Marker } from "pigeon-maps";
import { Link, useLocation } from "react-router-dom";
import { useEffect, useRef } from "react";

import NavBar from "../components/NavBar";
import NavBarLoggedIn from "../components/NavBarLoggedIn";
import Chart from "chart.js/auto";
import arrow from "../images/arrow.png";

// ------The VolcanoMap page---------------
export default function VolcanoMap({ isLoggedIn }) {
  const location = useLocation();
  // Getting the latitude
  const latitude = location.state.targetLatitude;
  // Getting the longitude
  const longitude = location.state.targetLongitude;
  // Getting the volcano name
  const name = location.state.name;
  // Getting the country
  const country = location.state.country;
  // Getting the region
  const region = location.state.region;
  // Getting the sub region
  const subRegion = location.state.subRegion;
  // Getting the last Erruption date
  const lastErruption = location.state.lastErruption;
  // Getting the summit
  const summit = location.state.summit;
  // Getting the elevation
  const elevation = location.state.elevation;
  // Getting the population densities
  const populations = location.state.populations;
  // Extracting the center point of the map using the latitude and longitude
  const center = [latitude, longitude];

  // Returning the JSX for the volcano map
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
          <p className="mt-3 text-danger">Back</p>
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
          <Map center={center} zoom={6} height={500} width="100%">
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
          {isLoggedIn && populations.every((value) => value != 0) ? (
            <div className="border border-danger bg-dark text-light">
              <h1 className="text-center mt-5">Population Density</h1>
              <ChartContainer populationData={populations} />
            </div>
          ) : isLoggedIn && populations.every((value) => value === 0) ? (
            <div className="border border-danger bg-dark text-light">
              <h1 className="text-center mt-5">Population Density</h1>
              <h2 className="text-center mt-5">No Data Found</h2>
            </div>
          ) : isLoggedIn &&
            (populations[0] != 0 ||
              populations[1] != 0 ||
              populations[2] != 0 ||
              populations[3] != 0) ? (
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

// The Volcano Details Component
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
  // Returning the following JSX if the user is logged in
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
    // Returning the following JSX if the user is not logged in
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

// The logic for handling the pie chart
function PieChart({ data }) {
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
        options: {
          plugins: {
            legend: {
              labels: {
                color: "white",
              },
            },
          },
        },
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

// The chart component
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
      <PieChart data={data} />
    </div>
  );
}
