export default function RepairCenterCard({ center, onDirections, onCall }) {
  return (
    <div className="border p-4 rounded-lg shadow">
      <h3 className="font-bold">{center.name}</h3>
      <p>{center.address}</p>
      <p>⭐ {center.rating}</p>
      <p>{center.hours}</p>

      <button onClick={() => onDirections(center)}>Directions</button>
      <button onClick={() => onCall(center.phone)}>Call</button>
    </div>
  );
}
