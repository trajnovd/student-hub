import { useEffect, useRef } from "react";
import { MapContainer, TileLayer, Marker } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import DiscountPopup from "./DiscountPopup";
function DiscountsMap({ discounts, selectedDiscount }) {
  const mapRef = useRef();

  // Center the map on the selected discount
  useEffect(() => {
    if (selectedDiscount && mapRef.current) {
      const { latitude, longitude } = selectedDiscount;
      mapRef.current.setView([latitude, longitude], 16, {
        animate: true,
      });
    }
  }, [selectedDiscount]);

  const defaultPosition = [41.99818, 21.425415];

  return (
    <MapContainer
      center={defaultPosition}
      zoom={14}
      style={{ height: "500px", width: "100%" }}
      ref={mapRef}
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />

      {discounts.map((discount) => (
        <Marker
          key={discount.id}
          position={[discount.latitude, discount.longitude]}
        >
          <DiscountPopup discount={discount} />
        </Marker>
      ))}
    </MapContainer>
  );
}

export default DiscountsMap;
