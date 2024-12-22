import { useMutation, useQueryClient } from "@tanstack/react-query";
import { insertStudent } from "../../services/apiStudents";

// Mutation to handle student insertion
export function useStudents() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: insertStudent,
    onSuccess: () => {
      queryClient.invalidateQueries(["students"]); // Refetch students list if needed
    },
    onError: (error) => {
      console.error("Error adding student:", error.message);
    },
  });
}
