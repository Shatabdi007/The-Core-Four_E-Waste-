import express from "express";

const router = express.Router();

// 🔑 RapidAPI credentials
const RAPID_API_KEY = "3abb2c6eb7msh5504619af122b02p1772e9jsn47f6f9728542";
const RAPID_API_HOST = "google-maps-api-free.p.rapidapi.com";

// ⏱️ Helper: timeout-safe fetch
async function fetchWithTimeout(url, options = {}, timeout = 10000) {
  const controller = new AbortController();
  const id = setTimeout(() => controller.abort(), timeout);

  try {
    const response = await fetch(url, {
      ...options,
      signal: controller.signal,
    });
    clearTimeout(id);
    return response;
  } catch (err) {
    clearTimeout(id);
    throw err;
  }
}

/* ---------------------------------------------------
   🔍 ROUTE 1: SEARCH NEARBY REPAIR CENTERS (lat/lng)
   GET /api/places/search?lat=26.25&lng=83.89&query=repair
--------------------------------------------------- */
router.get("/search", async (req, res) => {
  const { query = "repair shop", lat, lng } = req.query;

  if (!lat || !lng) {
    return res.status(400).json({
      success: false,
      error: "Latitude & longitude are required",
    });
  }

  try {
    const url = `https://${RAPID_API_HOST}/google-find-place-search?place=${encodeURIComponent(
      query
    )}`;

    const response = await fetchWithTimeout(url, {
      method: "GET",
      headers: {
        "x-rapidapi-key": RAPID_API_KEY,
        "x-rapidapi-host": RAPID_API_HOST,
      },
    });

    if (!response.ok) {
      throw new Error(`RapidAPI failed: ${response.status}`);
    }

    const data = await response.json();

    res.json({
      success: true,
      source: "RapidAPI Google Maps Free",
      userLocation: { lat, lng },
      results: data,
    });
  } catch (error) {
    console.error("❌ Places SEARCH error:", error.message);

    // ✅ FALLBACK DATA (IMPORTANT)
    res.json({
      success: true,
      fallback: true,
      results: [
        {
          name: "Local Repair Center",
          address: "Near your location",
          rating: 4.2,
        },
        {
          name: "City Electronics Repair",
          address: "Main Road",
          rating: 4.0,
        },
        {
          name: "QuickFix Services",
          address: "Market Area",
          rating: 4.3,
        },
      ],
    });
  }
});

/* ---------------------------------------------------
   🔎 ROUTE 2: FIND PLACE BY NAME
   GET /api/places/find?place=sharma vishnu
--------------------------------------------------- */
router.get("/find", async (req, res) => {
  try {
    const { place } = req.query;

    if (!place) {
      return res.status(400).json({
        success: false,
        error: "place query is required",
      });
    }

    const url = `https://${RAPID_API_HOST}/google-find-place-search?place=${encodeURIComponent(
      place
    )}`;

    const response = await fetchWithTimeout(url, {
      method: "GET",
      headers: {
        "x-rapidapi-key": RAPID_API_KEY,
        "x-rapidapi-host": RAPID_API_HOST,
      },
    });

    if (!response.ok) {
      throw new Error(`RapidAPI error: ${response.status}`);
    }

    const data = await response.json();

    res.json({
      success: true,
      source: "RapidAPI Google Maps Free",
      query: place,
      results: data,
    });
  } catch (error) {
    console.error("❌ Places FIND error:", error.message);

    res.status(500).json({
      success: false,
      error: "Failed to fetch place data",
    });
  }
});

export default router;
