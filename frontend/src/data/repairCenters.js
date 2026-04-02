export const sampleRepairCenters = [
  {
    id: "1",
    name: "iCare Mobile Repairs",
    address: "MG Road, Bangalore",
    phone: "+919876543210",
    rating: 4.8,
    reviewCount: 245,
    latitude: 12.9716,
    longitude: 77.5946,
    openNow: true,
    hours: "9 AM - 9 PM",
    services: ["Screen Repair", "Battery Replacement"],
  },
];

export const calculateDistance = (lat1, lon1, lat2, lon2) => {
  const R = 6371;
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLon = ((lon2 - lon1) * Math.PI) / 180;

  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(lat1 * Math.PI / 180) *
      Math.cos(lat2 * Math.PI / 180) *
      Math.sin(dLon / 2) ** 2;

  return R * (2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a)));
};

export const getNearbyRepairCenters = (lat, lon) => {
  return sampleRepairCenters.map(center => ({
    ...center,
    distance: calculateDistance(lat, lon, center.latitude, center.longitude),
  }));
};
