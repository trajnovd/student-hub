import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  fetchEvents,
  updateEvent,
  deleteEvent,
} from "../../services/apiEvents";

// Fetch Events Hook
export function useFetchEvents() {
  return useQuery({
    queryKey: ["events"],
    queryFn: fetchEvents,
  });
}

// Update Event Hook
export function useUpdateEvent() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, updates }) => updateEvent(id, updates),
    onSuccess: () => {
      queryClient.invalidateQueries(["events"]);
    },
  });
}

// Delete Event Hook
export function useDeleteEvent() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteEvent,
    onSuccess: () => {
      queryClient.invalidateQueries(["events"]);
    },
  });
}
//Length of array
export function empty(n) {
  return n != 0;
}
export function Page(n) {
  return n > 1;
}
