import React from "react";

function DiscountCard({ discount, onClick }) {
  return (
    <div
      className="rounded-lg shadow-lg bg-white p-6 mb-4 cursor-pointer hover:scale-105 transition"
      onClick={() => onClick(discount)}
    >
      <h2 className="text-2xl font-semibold">{discount.title}</h2>
      <p className="text-gray-600">{discount.description}</p>
      {discount.discount_percent ? (
        <p className="text-blue-500 font-bold">
          {discount.discount_percent}% Off
        </p>
      ) : (
        ""
      )}
      <p className="text-sm text-gray-500">{discount.location}</p>
    </div>
  );
}

export default DiscountCard;
