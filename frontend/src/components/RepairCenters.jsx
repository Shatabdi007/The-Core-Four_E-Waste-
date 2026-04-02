import React, { useEffect, useState } from "react";
import RepairMap from "./RepairCentersMap";

const API_KEY = "3abb2c6eb7msh5504619af122b02p1772e9jsn47f6f9728542";

function RepairCenters() {
  const [lat, setLat] = useState(null);
  const [lng, setLng] = useState(null);
  const [centers, setCenters] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // =========================
  // GET USER LOCATION
  // =========================
  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setLat(pos.coords.latitude);
        setLng(pos.coords.longitude);
      },
      () => setError("❌ Location permission denied")
    );
  }, []);

  // ==================================================
  // ✅ FETCH FROM YOUR BACKEND (DB BASED)
  // ==================================================
  const fetchCentersFromBackend = async (cat) => {
    if (!lat || !lng) return;

    setLoading(true);
    setError("");
    setCenters([]);

    try {
      const res = await fetch(
        `http://localhost:5000/api/repair-centers/nearby?lat=${lat}&lng=${lng}&category=${cat}`
      );

      const data = await res.json();
      setCenters(data);
    } catch (err) {
      setError("❌ Failed to load repair centers");
    }

    setLoading(false);
  };

  // ==================================================
  // ❌ OLD RAPID API (KEPT – NOT USED FOR MAP)
  // ==================================================
  const fetchCenters = async (query) => {
    if (!lat || !lng) return;

    setLoading(true);
    setError("");
    setCenters([]);

    try {
      const res = await fetch(
        `https://google-map-scraper3.p.rapidapi.com/searchmaps.php?query=${encodeURIComponent(
          query
        )}&limit=20&country=in&zoom=13`,
        {
          headers: {
            "x-rapidapi-host": "google-map-scraper3.p.rapidapi.com",
            "x-rapidapi-key": API_KEY,
          },
        }
      );

      const data = await res.json();
      setCenters(data.results || []);
    } catch (err) {
      setError("❌ Failed to load repair centers");
    }

    setLoading(false);
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Nearby Repair Centers</h2>

      {lat && lng && (
        <p>
          📍 Your Location: {lat.toFixed(3)}, {lng.toFixed(3)}
        </p>
      )}

      {/* =========================
          CATEGORY BUTTONS
         ========================= */}
      {/* CATEGORY BUTTONS */}
<div style={{ margin: "15px 0", display: "flex", gap: "10px" }}>
  <button onClick={() => fetchCentersFromBackend("mobile")}>
    📱 Mobile Repair
  </button>
  <button onClick={() => fetchCentersFromBackend("laptop")}>
    💻 Laptop Repair
  </button>
  <button onClick={() => fetchCentersFromBackend("appliance")}>
    🏠 Home Appliance
  </button>
</div>

{/* MAP SECTION (ALAG) */}
<RepairMap lat={lat} lng={lng} centers={centers} />

      {/* =========================
          ✅ MAP (PROPER PLACE)
         ========================= */}
     
      {loading && <p>🔍 Finding nearby repair centers...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}

      {centers.length === 0 && !loading && <p>No repair centers found</p>}

      {/* =========================
          RESULTS LIST
         ========================= */}
      <div style={{ display: "grid", gap: "15px", marginTop: "20px" }}>
        {centers.map((c, i) => (
          <div
            key={c._id || i}
            style={{
              padding: "15px",
              borderRadius: "10px",
              background: "#fff",
              boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
            }}
          >
            <h3>{c.name}</h3>
            <p>📍 {c.address}</p>

            {c.rating && <p>⭐ {c.rating}</p>}

            {c.phone && (
              <a href={`tel:${c.phone}`} style={{ color: "green" }}>
                📞 Call
              </a>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default RepairCenters;
