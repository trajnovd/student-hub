import React, { useState } from "react";
import DiscountCard from "./DiscountCard";
import DiscountsMap from "./DiscountsMap";
import { useFetchDiscounts } from "./useDiscounts";
import Filter from "../../ui/Filter";
import { useSearchParams } from "react-router-dom";
import Spinner from "../../ui/Spinner";

function DiscountList() {
  const { data: discounts = [], isLoading, error } = useFetchDiscounts();
  const [selectedDiscount, setSelectedDiscount] = useState(null);
  const [searchParams, setSearchParams] = useSearchParams();

  // Get filter from URL or default to "All"
  const filter = searchParams.get("category") || "All";

  if (isLoading) return <Spinner />;
  if (error) return <p>Error loading discounts.</p>;

  const handleCardClick = (discount) => {
    setSelectedDiscount(discount);
  };

  // Update URL when filter is selected
  const handleFilterChange = (value) => {
    searchParams.set("category", value);
    setSearchParams(searchParams);
  };

  // Filter discounts based on the selected category from URL
  const filteredDiscounts =
    filter === "All"
      ? discounts
      : discounts.filter((discount) => discount.Type === filter);

  return (
    <div className="p-6">
      {/* Map */}
      <DiscountsMap selectedDiscount={selectedDiscount} />

      {/* Filter */}
      <div className="mt-4">
        <Filter
          filterField="category"
          options={[
            { label: "All", value: "All" },
            { label: "Food", value: "Food" },
            { label: "Culture", value: "Cultural" },
            { label: "Gym", value: "Gym" },
          ]}
          onFilterChange={handleFilterChange}
        />
      </div>

      {/* Discounts List */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
        {filteredDiscounts.map((discount) => (
          <DiscountCard
            key={discount.id}
            discount={discount}
            onClick={handleCardClick}
          />
        ))}
      </div>
    </div>
  );
}

export default DiscountList;
