import NavBar from "../components/NavBar";
import Footer from "../components/Footer";
import { AgGridReact } from "ag-grid-react";
import { useState, useEffect } from "react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-balham.css";

export default function VolcanoList() {
  const [listData, setListData] = useState([]);
  const [country, setCountry] = useState("");
  const [population, setPopulation] = useState("");
  const [rowData, setRowData] = useState([]);

  // http://4.237.58.241:3000/volcanoes?country=India//

  function displaySelectedData(e) {
    setCountry(e.target.value);
  }
  function findViaPopulation(e) {
    setPopulation(e.target.value);
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
      <NavBar />
      <div
        className="ag-theme-balham justify-content-center"
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
          />
        }
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
      <option>Open this select menu</option>
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
      <option value={"5km"}>5km</option>
      <option value={"10km"}>10km</option>
      <option value={"30km"}>30km</option>
      <option value={"100km"}>100km</option>
    </select>
  );
}
