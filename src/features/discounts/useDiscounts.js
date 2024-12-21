import { useQuery } from "@tanstack/react-query";
import { fetchDiscounts } from "../../services/apiDiscounts";

export function useFetchDiscounts() {
  return useQuery({
    queryKey: ["discounts"],
    queryFn: fetchDiscounts,
  });
}
