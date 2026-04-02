import React, { useEffect, useState } from "react";

const RAPID_API_KEY = "1aa5d436e4msha735aa36b15014fp19a262jsn64d31cc7e431";

function RepairCenterFinder({ userLatitude, userLongitude, category = "mobile repair shop" }) {
  const [centers, setCenters] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!userLatitude || !userLongitude) return;

    fetchCenters();
    // eslint-disable-next-line
  }, [userLatitude, userLongitude, category]);

  const fetchCenters = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await fetch(
        `https://google-map-scraper3.p.rapidapi.com/searchmaps.php?query=${encodeURIComponent(
          category
        )}&limit=15&country=in&offset=0&zoom=14`,
        {
          method: "GET",
          headers: {
            "x-rapidapi-host": "google-map-scraper3.p.rapidapi.com",
            "x-rapidapi-key": RAPID_API_KEY,
          },
        }
      );

      const data = await response.json();

      if (!data || !data.results) {
        throw new Error("No data received");
      }

      setCenters(data.results);
    } catch (err) {
      console.error(err);
      setError("Failed to load repair centers");
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <p>🔍 Finding nearby repair centers...</p>;
  if (error) return <p style={{ color: "red" }}>{error}</p>;
  if (centers.length === 0) return <p>No repair centers found</p>;

  return (
    <div className="centers-list">
      {centers.map((place, index) => (
        <div key={index} className="center-card">
          <h3>{place.name}</h3>
          <p>📍 {place.address}</p>
          <p>⭐ Rating: {place.rating || "N/A"}</p>

          {place.phone && (
            <a href={`tel:${place.phone}`} className="btn-secondary">
              Call
            </a>
          )}

          {place.website && (
            <a
              href={place.website}
              target="_blank"
              rel="noreferrer"
              className="btn-secondary"
            >
              Website
            </a>
          )}
        </div>
      ))}
    </div>
  );
}

export default RepairCenterFinder;
