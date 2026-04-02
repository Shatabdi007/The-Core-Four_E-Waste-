import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import L from "leaflet";
import { useEffect } from "react";

// ===============================
// FIX DEFAULT MARKER ICON ISSUE
// ===============================
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  iconUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  shadowUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
});

// ===============================
// FIX MAP CUT / RESIZE ISSUE
// ===============================
function FixMapResize() {
  const map = useMap();

  useEffect(() => {
    setTimeout(() => {
      map.invalidateSize();
    }, 300);
  }, [map]);

  return null;
}

function RepairCentersMap({ lat, lng, centers }) {
  if (!lat || !lng) return null;

  return (
    <div
      style={{
        height: "420px",
        width: "100%",
        marginTop: "20px",
        borderRadius: "12px",
        overflow: "hidden",
        boxShadow: "0 6px 16px rgba(0,0,0,0.15)",
      }}
    >
      <MapContainer
        center={[lat, lng]}
        zoom={13}
        scrollWheelZoom={true}
        style={{ height: "100%", width: "100%" }}
      >
        <FixMapResize />

        <TileLayer
          attribution="&copy; OpenStreetMap contributors"
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {/* ===============================
            USER LOCATION MARKER
           =============================== */}
        <Marker position={[lat, lng]}>
          <Popup>
            <strong>You are here</strong>
          </Popup>
        </Marker>

        {/* ===============================
            REPAIR CENTER MARKERS
           =============================== */}
        {centers.map((c) => {
          if (!c.location?.coordinates) return null;

          return (
            <Marker
              key={c._id}
              position={[
                c.location.coordinates[1], // LAT
                c.location.coordinates[0], // LNG
              ]}
            >
              <Popup>
                <strong>{c.name}</strong>
                <br />
                {c.address}
              </Popup>
            </Marker>
          );
        })}
      </MapContainer>
    </div>
  );
}

export default RepairCentersMap;
