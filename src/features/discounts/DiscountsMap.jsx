import React, { useEffect, useRef } from "react";
import { MapContainer, TileLayer, Marker } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import DiscountPopup from "./DiscountPopup";
import { useFetchDiscounts } from "./useDiscounts";
import Spinner from "../../ui/Spinner";
import { useSearchParams } from "react-router-dom";

function DiscountsMap({ selectedDiscount }) {
  const mapRef = useRef();
  const defaultPosition = [41.99818, 21.425415];
  const { data: discounts = [], isLoading, error } = useFetchDiscounts();
  const [searchParams] = useSearchParams();

  // Get the filter from URL
  const filter = searchParams.get("category") || "All";

  // Center the map on the selected discount
  useEffect(() => {
    if (selectedDiscount && mapRef.current) {
      const { latitude, longitude } = selectedDiscount;
      mapRef.current.setView([latitude, longitude], 16, {
        animate: true,
      });
    }
  }, [selectedDiscount]);

  if (isLoading) {
    return <Spinner />;
  }

  if (error) {
    return <p className="text-center text-red-500">Error loading discounts.</p>;
  }

  // Filter discounts for map markers
  const filteredDiscounts =
    filter === "All"
      ? discounts
      : discounts.filter((discount) => discount.Type === filter);

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

      {filteredDiscounts.map((discount) => (
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
