import React, { useState } from "react";
import DiscountCard from "./DiscountCard";
import DiscountsMap from "./DiscountsMap";
import { useFetchDiscounts } from "./useDiscounts";

function DiscountList() {
  const { data: discounts = [], isLoading, error } = useFetchDiscounts();
  const [selectedDiscount, setSelectedDiscount] = useState(null);

  if (isLoading) return <p>Loading discounts...</p>;
  if (error) return <p>Error loading discounts.</p>;

  const handleCardClick = (discount) => {
    setSelectedDiscount(discount);
  };

  return (
    <div className="p-6">
      <DiscountsMap discounts={discounts} selectedDiscount={selectedDiscount} />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
        {discounts.map((discount) => (
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
