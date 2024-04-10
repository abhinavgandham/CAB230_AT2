import NavBar from "../components/NavBar";
import Footer from "../components/Footer";
import { AgGridReact } from "ag-grid-react";
import { useState, useEffect } from "react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-balham.css";

export default function VolcanoList() {
  const [listData, setListData] = useState([]);
  const [country, setCountry] = useState("");
  const [rowData, setRowData] = useState([]);

  // http://4.237.58.241:3000/volcanoes?country=India//

  function displaySelectedData(e) {
    setCountry(e.target.value);
  }

  const columns = [
    { headerName: "Name", field: "name" },
    { headerName: "Region", field: "region" },
    { headerName: "Subregion", field: "subregion" },
  ];

  useEffect(() => {
    if (country != "")
      fetch(`http://4.237.58.241:3000/volcanoes?country=${country}`)
        .then((res) => res.json())
        .then((data) => setRowData(data));
  }, [country]);

  useEffect(() => {
    fetch("http://4.237.58.241:3000/countries")
      .then((res) => res.json())
      .then((data) => {
        setListData(data);
      });
  }, []);

  return (
    <div>
      <NavBar />
      <div
        className="ag-theme-material justify-content-center"
        style={{
          height: "300px",
          width: "600px",
        }}
      >
        <select
          className="form-select"
          aria-label="select country"
          value={country}
          onChange={displaySelectedData}
        >
          <option>Open this select menu</option>
          {listData.map((country) => {
            return (
              <option key={country} value={country}>
                {country}
              </option>
            );
          })}
        </select>
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
