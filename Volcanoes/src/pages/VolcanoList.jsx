import NavBar from "../components/NavBar";
import Footer from "../components/Footer";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-balham.css";

export default function VolcanoList() {
  const table = {
    columns: [
      { headerName: "Name", field: "name" },
      { headerName: "Region", field: "region" },
      { headerName: "Subregion", field: "subregion" },
    ],
    rowData: [
      { name: "Abu", region: "Japan, Taiwan, Marianas", subregion: "Honshu" },
      {
        name: "Akan",
        region: "Japan, Taiwan, Marianas",
        subregion: "Hokkaido",
      },
      {
        name: "Asamayama",
        region: "Japan, Taiwan, Marianas",
        subregion: "Honshu",
      },
    ],
  };

  return (
    <div>
      <NavBar />
      <div
        className="ag-theme-balham"
        style={{ height: "300px", width: "600px" }}
      >
        <AgGridReact columnDefs={table.columns} rowData={table.rowData} />
      </div>
      <Footer />
    </div>
  );
}
