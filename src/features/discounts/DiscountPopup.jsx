import React from "react";
import { Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { popupColor } from "./useDiscounts";

export default function DiscountPopup({ discount }) {
  const typ = discount.Type;
  console.log(typ);
  const headerColor = popupColor(typ);
  return (
    <Popup>
      {discount.discount_percent ? (
        <h1 className={`${headerColor} font-bold text-lg`}>
          {discount.title + " " + discount.discount_percent + "%"}
        </h1>
      ) : (
        <h1 className={`${headerColor} font-bold text-lg`}>{discount.title}</h1>
      )}
      <p className={`${headerColor} text-xs`}>{typ}</p>
      <p className="text-gray-600 text-sm">{discount.description}</p>
    </Popup>
  );
}
