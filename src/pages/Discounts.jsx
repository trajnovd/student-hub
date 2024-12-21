import { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { fetchDiscounts } from "../services/apiDiscounts.js";
// Example data for discounts
function DiscountsMap() {
  const [discounts, setDiscounts] = useState([]);

  useEffect(() => {
    const getDiscounts = async () => {
      const data = await fetchDiscounts();
      console.log(data);

      setDiscounts(data);
    };
    getDiscounts();
  }, []);
  // Default center position of the map
  const defaultPosition = [41.99818, 21.425415];

  return (
    <div>
      {/* MapContainer sets up the map */}
      <MapContainer
        center={defaultPosition}
        zoom={14}
        style={{ height: "500px", width: "100%" }}
      >
        {/* TileLayer to use OpenStreetMap tiles */}
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />

        {/* Rendering markers for each discount */}
        {discounts.map((discount) => (
          <Marker
            key={discount.id}
            position={[discount.latitude, discount.longitude]}
          >
            <Popup>
              <h3>{discount.title + " "}</h3>
              <p>{discount.description}</p>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
}

export default DiscountsMap;
