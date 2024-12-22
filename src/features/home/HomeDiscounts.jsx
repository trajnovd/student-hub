import { useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { useFetchDiscounts } from "../discounts/useDiscounts";
import DiscountCard from "../discounts/DiscountCard";
import Spinner from "../../ui/Spinner";
import { customIcon } from "../discounts/useDiscounts";
import DiscountPopup from "../discounts/DiscountPopup";
function HomeDiscounts() {
  const { data: discounts = [], isLoading, error } = useFetchDiscounts();
  const [selectedDiscount, setSelectedDiscount] = useState(null);
  const [currentPage, setCurrentPage] = useState(0);
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
          <div className="md:w-1/3 grid gap-6">
            {paginatedDiscounts.map((discount) => (
              <DiscountCard
                key={discount.id}
                discount={discount}
                onClick={handleCardClick}
              />
            ))}
            <div className="flex justify-between mt-6">
              <button
                onClick={handlePrevPage}
                className="px-4 py-2 bg-blue-500 text-white rounded-lg shadow-lg hover:bg-indigo-500"
              >
                Previous
              </button>
              <button
                onClick={handleNextPage}
                className="px-4 py-2 bg-blue-500 text-white rounded-lg shadow-lg hover:bg-indigo-500"
              >
                Next
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default HomeDiscounts;
