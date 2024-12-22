import { useQuery } from "@tanstack/react-query";
import { fetchDiscounts } from "../../services/apiDiscounts";
import L from "leaflet";
import markerIconRed from "../../assets/marker-icon-red.png";
import markerIconGreen from "../../assets/marker-icon-emerald.png";
import markerIconBlue from "../../assets/marker-icon-2x.png";
export function useFetchDiscounts() {
  return useQuery({
    queryKey: ["discounts"],
    queryFn: fetchDiscounts,
  });
}
export function popupColor(type) {
  if (type === "Gym") {
    return "text-red-500";
  }
  if (type === "Food") {
    return "text-emerald-600";
  }
  if (type === "Cultural") {
    return "text-indigo-500";
  }
}
export function customIcon(discount) {
  const type = discount.Type;
  let iconUrl;

  // Assign icon based on the discount type
  if (type === "Gym") {
    iconUrl = markerIconRed; // Use the red icon for Gym
  } else if (type === "Food") {
    iconUrl = markerIconGreen; // Use the green icon for Food
  } else if (type === "Cultural") {
    iconUrl = markerIconBlue; // Use the blue icon for Cultural
  } else {
    iconUrl = markerIconRed; // Default icon (you can set this to any icon)
  }

  return new L.Icon({
    iconUrl, // Set the icon URL dynamically
    iconSize: [25, 41], // Size of the icon
    iconAnchor: [12, 41], // Anchor point for the icon
    popupAnchor: [1, -34],
    shadowUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png",
    shadowSize: [41, 41],
  });
}
