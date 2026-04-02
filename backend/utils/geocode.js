import axios from "axios";

export const geocodeLocation = async (text) => {
  const response = await axios.post(
    "https://google-api31.p.rapidapi.com/map",
    {
      text,
      place: "",
      street: "",
      city: "",
      country: "India",
      state: "",
      postalcode: "",
      latitude: "",
      longitude: "",
      radius: "",
    },
    {
      headers: {
        "Content-Type": "application/json",
        "x-rapidapi-host": "google-api31.p.rapidapi.com",
        "x-rapidapi-key": process.env.RAPID_API_KEY,
      },
    }
  );

  return response.data;
};
