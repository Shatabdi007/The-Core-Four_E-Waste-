import { useEffect, useState } from "react";

export const useGeolocation = () => {
  const [state, setState] = useState({
    latitude: null,
    longitude: null,
    loading: true,
    error: null,
  });

  const requestLocation = () => {
    if (!navigator.geolocation) {
      setState({ ...state, error: "Geolocation not supported", loading: false });
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setState({
          latitude: pos.coords.latitude,
          longitude: pos.coords.longitude,
          loading: false,
          error: null,
        });
      },
      () => {
        setState({
          latitude: null,
          longitude: null,
          loading: false,
          error: "Location permission denied",
        });
      }
    );
  };

  useEffect(() => {
    requestLocation();
  }, []);

  return { ...state, requestLocation };
};
