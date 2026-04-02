import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";

const RepairMap = ({ lat, lng, centers }) => {
  return (
    <div style={{ marginTop: "20px" }}>
      <MapContainer
        center={[lat, lng]}
        zoom={13}
        style={{ height: "400px", width: "100%" }}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {/* USER LOCATION */}
        <Marker position={[lat, lng]}>
          <Popup>Your Location</Popup>
        </Marker>

        {/* REPAIR CENTERS */}
        {centers.map((c) => (
          <Marker
            key={c._id}
            position={[
              c.location.coordinates[1],
              c.location.coordinates[0],
            ]}
          >
            <Popup>
              <strong>{c.name}</strong><br />
              {c.address}
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
};

export default RepairMap;
