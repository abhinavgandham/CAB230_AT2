import { Map, Marker } from "pigeon-maps";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";

// eslint-disable-next-line react/prop-types

export default function VolcanoMap() {
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
  const center = [latitude, longitude];
  return (
    <div>
      <h1 style={{ textAlign: "center" }}>{name}</h1>
      <button onClick={backToList}>Back</button>
      <div>
        <section className="mb-4">
          <Map center={center} height={500} width={1100}>
            <Marker anchor={center} />
          </Map>
        </section>

        <h2 style={{ textAlign: "center", fontSize: "15px" }}>
          <strong>Country:</strong> {country}
        </h2>
        <h2 style={{ textAlign: "center", fontSize: "15px" }}>
          <strong>Region:</strong> {region}
        </h2>
        <div></div>
        <h2 style={{ textAlign: "center", fontSize: "15px" }}>
          <strong>Sub Region:</strong> {subRegion}
        </h2>
        <h2 style={{ textAlign: "center", fontSize: "15px" }}>
          <strong>Last Eruption:</strong> {lastErruption}
        </h2>
        <h2 style={{ textAlign: "center", fontSize: "15px" }}>
          <strong>Summit:</strong> {summit}
        </h2>
        <h2 style={{ textAlign: "center", fontSize: "15px" }}>
          <strong>Elevation:</strong> {elevation}
        </h2>
        <h2 style={{ textAlign: "center", fontSize: "15px" }}>
          <strong>Latitude:</strong> {latitude}
        </h2>
        <h2 style={{ textAlign: "center", fontSize: "15px" }}>
          <strong>Longitude:</strong> {longitude}
        </h2>
      </div>
    </div>
  );
}
