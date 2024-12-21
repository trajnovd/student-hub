import { useQuery } from "@tanstack/react-query";
import { fetchScholarships } from "../../services/apiScholarships";

export function useFetchScholarships() {
  return useQuery({
    queryKey: ["scholarships"],
    queryFn: fetchScholarships,
  });
}
