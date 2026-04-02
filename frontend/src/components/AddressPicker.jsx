import React, { useState } from 'react';
import { indianStates } from '../data/repairData';
import './AddressPicker.css';

const AddressPicker = ({ onAddressSelect, selectedAddress }) => {
  const [mode, setMode] = useState('manual');
  const [isDetecting, setIsDetecting] = useState(false);
  const [address, setAddress] = useState({
    street: '',
    city: '',
    state: '',
    pincode: '',
    landmark: '',
  });
  const [searchQuery, setSearchQuery] = useState('');

  const handleInputChange = (field, value) => {
    setAddress(prev => ({ ...prev, [field]: value }));
  };

  // ✅ REAL LOCATION DETECTION + AUTO-FILL
  const handleCurrentLocation = () => {
    setIsDetecting(true);

    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const { latitude, longitude } = position.coords;

          try {
            // ⭐ Reverse Geocoding API
            const res = await fetch(
              `https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json`
            );
            const data = await res.json();

            const a = data.address;

            const detectedAddress = {
              street: a.road || a.residential || a.neighbourhood || "",
              landmark: a.suburb || a.locality || "",
              city: a.city || a.town || a.village || "",
              state: a.state || "",
              pincode: a.postcode || "",
              coordinates: { lat: latitude, lng: longitude }
            };

            setAddress(detectedAddress);
            setMode("manual");
            setIsDetecting(false);
          } catch (err) {
            console.error("Error:", err);
            alert("Unable to fetch address from location.");
            setIsDetecting(false);
          }
        },
        (error) => {
          console.error("Location error:", error);
          alert("Unable to detect location. Enter manually.");
          setIsDetecting(false);
        }
      );
    } else {
      alert("Geolocation not supported by your browser.");
      setIsDetecting(false);
    }
  };

  // ✅ Submit handler
  const handleSubmit = () => {
    const fullAddress = `${address.street}, ${address.city}, ${address.state}, ${address.pincode}`;

    if (typeof onAddressSelect === "function") {
      onAddressSelect(fullAddress);
    }

    alert("✅ Your address has been added successfully!");
  };

  const isValid = address.street && address.city && address.state && address.pincode;

  const savedAddresses = [
    {
      type: 'home',
      icon: '🏠',
      address: { street: '123 MG Road, Near Metro', city: 'Bangalore', state: 'Karnataka', pincode: '560001' },
    },
    {
      type: 'office',
      icon: '🏢',
      address: { street: '456 Whitefield Main Road', city: 'Bangalore', state: 'Karnataka', pincode: '560066' },
    },
  ];

  return (
    <div className="address-picker">

      {/* Location Buttons */}
      <div className="location-options">
        <button
          className={`option-btn ${isDetecting ? "loading" : ""}`}
          onClick={handleCurrentLocation}
          disabled={isDetecting}
        >
          {isDetecting ? "📍 Detecting..." : "📍 Use Current Location"}
        </button>

        <button
          className={`option-btn ${mode === "manual" ? "active" : ""}`}
          onClick={() => setMode("manual")}
        >
          ✏️ Enter Manually
        </button>
      </div>

      {/* Saved Addresses */}
      <div className="saved-addresses">
        <label>Saved Addresses</label>
        <div className="saved-grid">
          {savedAddresses.map((saved) => (
            <div
              key={saved.type}
              className={`saved-card ${
                selectedAddress?.street === saved.address.street ? "selected" : ""
              }`}
              onClick={() => {
                setAddress(saved.address);
                onAddressSelect(saved.address);
              }}
            >
              <span className="saved-icon">{saved.icon}</span>
              <div className="saved-info">
                <h4>{saved.type}</h4>
                <p>{saved.address.street}, {saved.address.city}</p>
              </div>
              {selectedAddress?.street === saved.address.street && <span className="check">✓</span>}
            </div>
          ))}
        </div>
      </div>

      {/* Search Bar */}
      <div className="search-bar">
        <span className="search-icon">🔍</span>
        <input
          type="text"
          placeholder="Search for area, street name..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      {/* Manual Form */}
      <div className="address-form">
        <div className="form-group">
          <label htmlFor="street">Street Address *</label>
          <input
            id="street"
            type="text"
            placeholder="House/Flat No., Building, Street"
            value={address.street}
            onChange={(e) => handleInputChange("street", e.target.value)}
          />
        </div>

        <div className="form-group">
          <label htmlFor="landmark">Landmark (Optional)</label>
          <input
            id="landmark"
            type="text"
            placeholder="Near temple, opposite mall, etc."
            value={address.landmark || ""}
            onChange={(e) => handleInputChange("landmark", e.target.value)}
          />
        </div>

        <div className="form-row">
          <div className="form-group">
            <label htmlFor="city">City *</label>
            <input
              id="city"
              type="text"
              placeholder="City"
              value={address.city}
              onChange={(e) => handleInputChange("city", e.target.value)}
            />
          </div>

          <div className="form-group">
            <label htmlFor="pincode">Pincode *</label>
            <input
              id="pincode"
              type="text"
              placeholder="6-digit pincode"
              value={address.pincode}
              onChange={(e) =>
                handleInputChange("pincode", e.target.value.replace(/\D/g, "").slice(0, 6))
              }
              maxLength={6}
            />
          </div>
        </div>

        <div className="form-group">
          <label htmlFor="state">State *</label>
          <select
            id="state"
            value={address.state}
            onChange={(e) => handleInputChange("state", e.target.value)}
          >
            <option value="">Select State</option>
            {indianStates.map((state) => (
              <option key={state} value={state}>{state}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Map Preview */}
      <div className="map-preview">
        <div className="map-placeholder">
          <span className="map-icon">📍</span>
          <p>{address.city ? `${address.city}, ${address.state}` : "Map preview will appear here"}</p>
        </div>
      </div>

      {/* Confirm Button */}
      <button className="btn-confirm" disabled={!isValid} onClick={handleSubmit}>
        ✓ Confirm Address
      </button>
    </div>
  );
};

export default AddressPicker;
