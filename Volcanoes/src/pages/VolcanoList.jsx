import NavBar from "../components/NavBar";
import Footer from "../components/Footer";
import { AgGridReact } from "ag-grid-react";
import { useState, useEffect } from "react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-balham.css";
import { useNavigate } from "react-router-dom";
import NavBarLoggedIn from "../components/NavBarLoggedIn";

// eslint-disable-next-line react/prop-types
export default function VolcanoList({ isLoggedIn, token }) {
  console.log("VolcanoList", isLoggedIn);
  console.log(token);
  const [listData, setListData] = useState([]);
  const [country, setCountry] = useState("");
  const [population, setPopulation] = useState("");
  const [rowData, setRowData] = useState([]);
  const navigate = useNavigate();

  // http://4.237.58.241:3000/volcanoes?country=India//

  function displaySelectedData(e) {
    setCountry(e.target.value);
  }
  function findViaPopulation(e) {
    setPopulation(e.target.value);
  }
  function countryId(e) {
    const selectedId = e.node.data.id;
    let targetLatitude;
    let targetLongitude;
    let name;
    let country;
    let region;
    let subRegion;
    let lastErruption;
    let summit;
    let elevation;
    let populations;
    if (isLoggedIn) {
      return fetch(`http://4.237.58.241:3000/volcano/${selectedId}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }).then((res) => {
        res
          .json()
          .then((data) => {
            targetLatitude = Number(data.latitude);
            targetLongitude = Number(data.longitude);
            name = data.name;
            country = data.country;
            region = data.region;
            subRegion = data.subregion;
            lastErruption = data.last_eruption;
            summit = data.summit;
            elevation = data.elevation;
            populations = [
              data.population_5km,
              data.population_10km,
              data.population_30km,
              data.population_100km,
            ];
            console.log(populations);
          })
          .then(() => {
            navigate("../pages/VolcanoMap.jsx", {
              state: {
                id: selectedId,
                targetLatitude: targetLatitude,
                targetLongitude: targetLongitude,
                name: name,
                country: country,
                region: region,
                subRegion: subRegion,
                lastErruption: lastErruption,
                summit: summit,
                elevation: elevation,
                populations: populations,
              },
            });
          });
      });
    } else {
      return fetch(`http://4.237.58.241:3000/volcano/${selectedId}`).then(
        (res) => {
          res
            .json()
            .then((data) => {
              targetLatitude = Number(data.latitude);
              targetLongitude = Number(data.longitude);
              name = data.name;
              country = data.country;
              region = data.region;
              subRegion = data.subregion;
              lastErruption = data.last_eruption;
              summit = data.summit;
              elevation = data.elevation;
            })
            .then(() => {
              navigate("../pages/VolcanoMap.jsx", {
                state: {
                  id: selectedId,
                  targetLatitude: targetLatitude,
                  targetLongitude: targetLongitude,
                  name: name,
                  country: country,
                  region: region,
                  subRegion: subRegion,
                  lastErruption: lastErruption,
                  summit: summit,
                  elevation: elevation,
                },
              });
            });
        }
      );
    }
  }

  const columns = [
    { headerName: "Name", field: "name" },
    { headerName: "Region", field: "region" },
    { headerName: "Subregion", field: "subregion" },
  ];

  useEffect(() => {
    fetch("http://4.237.58.241:3000/countries")
      .then((res) => res.json())
      .then((data) => {
        setListData(data);
      });
  }, []);

  useEffect(() => {
    if (country != "")
      fetch(`http://4.237.58.241:3000/volcanoes?country=${country}`)
        .then((res) => res.json())
        .then((data) => setRowData(data));
  }, [country]);

  useEffect(() => {
    if (country != "" && population != "") {
      fetch(
        `http://4.237.58.241:3000/volcanoes?country=${country}&populatedWithin=${population}`
      )
        .then((res) => res.json())
        .then((data) => setRowData(data));
    }
  }, [country, population]);

  return (
    <div>
      {isLoggedIn ? <NavBarLoggedIn /> : <NavBar />}
      <div
        className="ag-theme-balham justify-content-center mx-auto"
        style={{
          height: "300px",
          width: "600px",
        }}
      >
        <CountrySelect
          targetCountry={country}
          dataSet={listData}
          displayData={displaySelectedData}
        />
        <PopulationSelect findWithPopulation={findViaPopulation} />
        {
          <AgGridReact
            columnDefs={columns}
            rowData={rowData}
            pagination={true}
            onCellClicked={countryId}
          />
        }
        <label htmlFor="Search Country" className="form-label mt-5 fs-4">
          Search Country
        </label>
        <div className="col-md-6">
          <input
            type="text"
            className="form-control input-sm"
            value={country}
            onChange={displaySelectedData}
          ></input>
        </div>
      </div>
      <Footer />
    </div>
  );
}

// eslint-disable-next-line react/prop-types
function CountrySelect({ targetCountry, dataSet, displayData }) {
  return (
    <select
      className="form-select"
      aria-label="select country"
      value={targetCountry}
      onChange={displayData}
    >
      <option>Country</option>
      {/* eslint-disable-next-line react/prop-types  */}
      {dataSet.map((country) => {
        return (
          <option key={country} value={country}>
            {country}
          </option>
        );
      })}
    </select>
  );
}

// eslint-disable-next-line react/prop-types
function PopulationSelect({ findWithPopulation }) {
  return (
    <select className="form-select" onChange={findWithPopulation}>
      <option>Populated Within</option>
      <option value={"5km"}>5km</option>
      <option value={"10km"}>10km</option>
      <option value={"30km"}>30km</option>
      <option value={"100km"}>100km</option>
    </select>
  );
}
