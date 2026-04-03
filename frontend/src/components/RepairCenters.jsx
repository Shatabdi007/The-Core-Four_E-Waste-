import React from "react";

function RepairCenters() {
  const openGoogleMaps = (searchQuery) => {
    const url = `https://www.google.com/maps/search/${encodeURIComponent(searchQuery)}`;
    window.open(url, "_blank", "noopener,noreferrer");
  };

  return (
    <div style={{ padding: "40px 20px", textAlign: "center", maxWidth: "800px", margin: "0 auto" }}>
      <h2 style={{ fontSize: "2rem", marginBottom: "30px", color: "#333" }}>
        Find Repair Centers in Bhopal 🗺️
      </h2>
      
      <p style={{ fontSize: "1.2rem", color: "#666", marginBottom: "40px" }}>
        Select a category below to instantly discover the best repair shops near you on Google Maps.
      </p>

      <div style={{ display: "flex", flexDirection: "column", gap: "20px", alignItems: "center" }}>
        <button 
          onClick={() => openGoogleMaps("Mobile repair shops in Bhopal")}
          style={{
            padding: "15px 30px",
            fontSize: "1.2rem",
            backgroundColor: "#4285f4",
            color: "white",
            border: "none",
            borderRadius: "8px",
            cursor: "pointer",
            width: "100%",
            maxWidth: "400px",
            boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
            transition: "transform 0.2s"
          }}
        >
          📱 Find Mobile Repair Shops
        </button>

        <button 
          onClick={() => openGoogleMaps("Laptop and Computer repair shops in Bhopal")}
          style={{
            padding: "15px 30px",
            fontSize: "1.2rem",
            backgroundColor: "#34a853",
            color: "white",
            border: "none",
            borderRadius: "8px",
            cursor: "pointer",
            width: "100%",
            maxWidth: "400px",
            boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
            transition: "transform 0.2s"
          }}
        >
          💻 Find Laptop & PC Repair
        </button>

        <button 
          onClick={() => openGoogleMaps("Electronic and Home Appliance repair shops in Bhopal")}
          style={{
            padding: "15px 30px",
            fontSize: "1.2rem",
            backgroundColor: "#fbbc05",
            color: "white",
            border: "none",
            borderRadius: "8px",
            cursor: "pointer",
            width: "100%",
            maxWidth: "400px",
            boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
            transition: "transform 0.2s"
          }}
        >
          🏠 Find Electronics Repair
        </button>
      </div>
    </div>
  );
}

export default RepairCenters;
