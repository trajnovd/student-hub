import { useState, useEffect } from "react";
import { MapContainer, TileLayer, Marker } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { useFetchDiscounts } from "../discounts/useDiscounts";
import DiscountCard from "../discounts/DiscountCard";
import Spinner from "../../ui/Spinner";
import { customIcon } from "../discounts/useDiscounts";
import DiscountPopup from "../discounts/DiscountPopup";
import { Link } from "react-router-dom";

function HomeDiscounts() {
  const { data: discounts = [], isLoading, error } = useFetchDiscounts();
  const [selectedDiscount, setSelectedDiscount] = useState(null);
  const [currentPage, setCurrentPage] = useState(0);
  const [fadeIn, setFadeIn] = useState(false); // Used to trigger fade-in effect
  const [fadeOut, setFadeOut] = useState(false); // Used to trigger fade-out effect
  const discountsPerPage = 2;

  const handleCardClick = (discount) => {
    setSelectedDiscount(discount);
  };

  const defaultPosition = [41.995764, 21.430505];
  const totalPages = Math.ceil(discounts.length / discountsPerPage);

  const handleNextPage = () => {
    setCurrentPage((prev) => (prev + 1) % totalPages);
  };

  const handlePrevPage = () => {
    setCurrentPage((prev) => (prev - 1 + totalPages) % totalPages);
  };

  const paginatedDiscounts = discounts.slice(
    currentPage * discountsPerPage,
    (currentPage + 1) * discountsPerPage
  );

  // Auto-scroll the discounts every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      handleNextPage();
    }, 5450); // Scroll every 5 seconds

    return () => clearInterval(interval); // Cleanup on unmount or when dependencies change
  }, [discounts, totalPages]);

  // Trigger fade-in and fade-out effects when currentPage changes
  useEffect(() => {
    setFadeIn(true); // Start fade-in
    const fadeInTimer = setTimeout(() => {
      setFadeIn(false); // After fade-in, wait 5 seconds before fading out
      setFadeOut(true); // Trigger fade-out after 5 seconds of visibility
    }, 5000); // Wait for fade-in to complete (500ms)

    const stayTimer = setTimeout(() => {
      setFadeOut(false); // Reset fade-out after 5 seconds, cards will stay visible for 5 seconds
    }, 5500); // Cards stay visible for 5 seconds (500ms for fade-in + 5000ms for visibility)

    return () => {
      clearTimeout(fadeInTimer);
      clearTimeout(stayTimer);
    };
  }, [currentPage]);

  if (isLoading) return <Spinner />;
  if (error)
    return <p className="text-center text-red-500">Error loading discounts.</p>;

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-6">
        <h2 className="text-4xl font-extrabold text-center text-indigo-600 mb-12">
          Discover the Best Discounts
        </h2>
        <div className="flex flex-col md:flex-row gap-12">
          <div className="md:w-2/3">
            <MapContainer
              center={defaultPosition}
              zoom={16}
              style={{ height: "400px", borderRadius: "12px" }}
              scrollWheelZoom={false}
              zoomControl={false}
              doubleClickZoom={false}
            >
              <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              />

              {discounts.map((discount) => (
                <Marker
                  key={discount.id}
                  position={[discount.latitude, discount.longitude]}
                  icon={customIcon(discount)}
                >
                  <DiscountPopup discount={discount} />
                </Marker>
              ))}
            </MapContainer>
          </div>
          <div className="md:w-1/3">
            {/* Container for the discount cards */}
            <div className="discounts-wrapper flex flex-col gap-6">
              {paginatedDiscounts.map((discount, index) => (
                <Link
                  to="/discounts"
                  key={discount.id}
                  className={`transition-opacity duration-500 ease-in-out ${
                    fadeIn
                      ? "opacity-100"
                      : fadeOut
                      ? "opacity-0"
                      : "opacity-100"
                  }`}
                  style={{
                    transitionDelay: `${index * 0.1}s`, // Stagger the fade effect slightly
                  }}
                >
                  <DiscountCard discount={discount} onClick={handleCardClick} />
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default HomeDiscounts;
