import { useQuery } from "@tanstack/react-query";
import { fetchDiscounts } from "../../services/apiDiscounts";

export function useFetchDiscounts() {
  return useQuery({
    queryKey: ["discounts"],
    queryFn: fetchDiscounts,
  });
}
export function popupColor(type) {
  console.log(type);
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
