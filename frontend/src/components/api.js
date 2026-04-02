export const geocodeLocation = async (text) => {
  const res = await fetch("http://localhost:5000/api/location/geocode", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ text }),
  });

  return res.json();
};
