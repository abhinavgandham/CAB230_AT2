/* eslint-disable react/prop-types */
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";
import { AgGridReact } from "ag-grid-react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-balham.css";
import NavBarLoggedIn from "../components/NavBarLoggedIn";

// ---------The Volcano List Page--------------
export default function VolcanoList({ isLoggedIn, token }) {
  // Setting state for the list data
  const [listData, setListData] = useState([]);
  // Setting state for the selected country
  const [country, setCountry] = useState(
    localStorage.getItem("selectedCountry") || ""
  );
  // Setting state for the selected population distance
  const [population, setPopulation] = useState(
    localStorage.getItem("selectedPopulation") || ""
  );
  // Setting state for the row data
  const [rowData, setRowData] = useState([]);
  const navigate = useNavigate();

  // function that displayes the data based on the selected country
  const displaySelectedData = (e) => {
    const selectedCountry = e.target.value;
    setCountry(selectedCountry);
    localStorage.setItem("selectedCountry", selectedCountry);
  };

  // function that displays the data based on country and population
  const findViaPopulation = (e) => {
    const selectedPopulation = e.target.value;
    setPopulation(selectedPopulation);
    localStorage.setItem("selectedPopulation", selectedPopulation);
  };

  // The response when a user is logged in and they click a cell in the table
  const isLoggedInResponse = (
    selectedId,
    targetLatitude,
    targetLongitude,
    name,
    country,
    region,
    subRegion,
    lastErruption,
    summit,
    elevation,
    populations
  ) => {
    // fetching the enpoint with the selectedID
    return fetch(`http://4.237.58.241:3000/volcano/${selectedId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        // Providing the user's JWT token in the ehader
        Authorization: `Bearer ${token}`,
      },
    }).then((res) => {
      res
        .json()
        .then((data) => {
          // setting the required information for the volcano map page
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
        })
        .then(() => {
          navigate("../pages/VolcanoMap.jsx", {
            // Sending the information to the volcano map page
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
  };

  // The response when a user is not logged in and they click a cell in the table
  const notLoggedInResponse = (
    selectedId,
    targetLatitude,
    targetLongitude,
    name,
    country,
    region,
    subRegion,
    lastErruption,
    summit,
    elevation
  ) => {
    // fetching the enpoint with the selectedID
    return fetch(`http://4.237.58.241:3000/volcano/${selectedId}`).then(
      (res) => {
        res
          .json()
          .then((data) => {
            // setting the required information for the volcano Map page
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
            // Sending the information to the volcano map page
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
  };

  // Function for handling when a user clicks on a country in the table
  // (passing required state to the map component)

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
      isLoggedInResponse(
        selectedId,
        targetLatitude,
        targetLongitude,
        name,
        country,
        region,
        subRegion,
        lastErruption,
        summit,
        elevation,
        populations
      );
    } else {
      notLoggedInResponse(
        selectedId,
        targetLatitude,
        targetLongitude,
        name,
        country,
        region,
        subRegion,
        lastErruption,
        summit,
        elevation
      );
    }
  }

  // Defining the columns of the table
  const columns = [
    { headerName: "Name", field: "name" },
    { headerName: "Region", field: "region" },
    { headerName: "Subregion", field: "subregion" },
  ];

  // UseEffect that sets the list data on render
  useEffect(() => {
    fetch("http://4.237.58.241:3000/countries")
      .then((res) => res.json())
      .then((data) => {
        setListData(data);
      });
  }, []);

  // useEffect that sets the row data based on the selected country
  useEffect(() => {
    if (country !== "") {
      fetch(`http://4.237.58.241:3000/volcanoes?country=${country}`)
        .then((res) => res.json())
        .then((data) => setRowData(data));
    }
  }, [country]);

  // useEffect that sets the row data based on country and population distance
  useEffect(() => {
    const placeHolderValue = "Populated Within";
    if (
      country !== "" &&
      population !== "" &&
      population !== placeHolderValue
    ) {
      fetch(
        `http://4.237.58.241:3000/volcanoes?country=${country}&populatedWithin=${population}`
      )
        .then((res) => res.json())
        .then((data) => setRowData(data));
    }
  }, [country, population]);

  // Returning the JSX for the volcano list page
  return (
    <div>
      {isLoggedIn ? <NavBarLoggedIn /> : <NavBar />}
      <div className="container">
        <div
          className="ag-theme-balham-dark justify-content-center mx-auto"
          style={{
            height: "300px",
          }}
        >
          <div className="row mt-2">
            <div className="col-sm-12 mb-2">
              <CountrySelect
                targetCountry={country}
                dataSet={listData}
                displayData={displaySelectedData}
              />
            </div>
          </div>

          <div className="col-sm-12 mb-2">
            <PopulationSelect findWithPopulation={findViaPopulation} />
          </div>
          <strong>
            <label htmlFor="Volcanoes" className="text-dark p-2 fs-6">
              Volcanoes
            </label>
          </strong>
          <AgGridReact
            className="table-responsive"
            columnDefs={columns}
            rowData={rowData}
            pagination={true}
            onCellClicked={countryId}
          />
          <CountrySearch
            country={country}
            selectionData={displaySelectedData}
          />
        </div>
      </div>
      <Footer />
    </div>
  );
}

// The Country Select component
function CountrySelect({ targetCountry, dataSet, displayData }) {
  return (
    <div>
      <strong>
        <label htmlFor="Country" className="text-dark p-2 fs-6">
          Select Country
        </label>
      </strong>
      <select
        className="form-select mb-2"
        aria-label="select country"
        value={targetCountry}
        onChange={displayData}
      >
        <option>Country</option>
        {dataSet.map((country) => {
          return (
            <option key={country} value={country}>
              {country}
            </option>
          );
        })}
      </select>
    </div>
  );
}

// The Population Select component
function PopulationSelect({ findWithPopulation }) {
  return (
    <div>
      <strong>
        <label htmlFor="Population" className="text-dark p-2 fs-6">
          Select Population
        </label>
      </strong>
      <select className="form-select mb-2" onChange={findWithPopulation}>
        <option>Populated Within</option>
        <option value={"5km"}>5km</option>
        <option value={"10km"}>10km</option>
        <option value={"30km"}>30km</option>
        <option value={"100km"}>100km</option>
      </select>
    </div>
  );
}

// The Quick Search Component
function CountrySearch({ selectionData }) {
  // Setting state for the search value
  const [value, setValue] = useState("");

  // Handling change in the input field when a user types in it
  const handleChange = (e) => {
    setValue(e.target.value);
  };

  // Function that displayes the selectiond data based on the value when search button is clicked
  const onSearch = () => {
    selectionData({ target: { value: value } });
  };
  return (
    <div className="container mt-3">
      <div className="border border-danger border-2 rounded shadow p-3">
        <label htmlFor="Search Country" className="form-label fs-4 text-dark">
          Quick Search (Country)
        </label>
        <div className="input-group">
          <input
            type="text"
            className="form-control"
            value={value}
            onChange={handleChange}
          ></input>
          <button className="btn btn-danger text-light" onClick={onSearch}>
            Search
          </button>
        </div>
      </div>
    </div>
  );
}
