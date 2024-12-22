
import { useEffect, useRef } from "react";
import { MapContainer, TileLayer, Marker } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import DiscountPopup from "./DiscountPopup";
function DiscountsMap({ discounts, selectedDiscount }) {

  const mapRef = useRef();
  const defaultPosition = [41.99818, 21.425415];

  // Fetch discounts using React Query
  const { data: discounts = [], isLoading, error } = useFetchDiscounts();

  // Center the map on the selected discount
  useEffect(() => {
    if (selectedDiscount && mapRef.current) {
      const { latitude, longitude } = selectedDiscount;
      mapRef.current.setView([latitude, longitude], 16, {
        animate: true,
      });
    }
  }, [selectedDiscount]);

  // Handle loading and error states
  if (isLoading) {
    return <p className="text-center">Loading discounts...</p>;
  }

  if (error) {
    return <p className="text-center text-red-500">Error loading discounts.</p>;
  }

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
