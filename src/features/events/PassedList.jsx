import React, { useState } from "react";
import { useFetchEvents, empty, Page } from "./useEvents";
import EventCard from "./EventCard";
import dayjs from "dayjs";
function PassedList() {
  const { data: events = [], isLoading, error } = useFetchEvents();
  const [currentPage, setCurrentPage] = useState(1);
  const eventsPerPage = 3; // 3 per row, 2 rows
  events.forEach((event) => {
    console.log(
      event.id,
      "Event Date:",
      event.date,
      "Valid:",
      dayjs(event.date).isValid()
    );
  });
  const upcomingEvents = events.filter(
    (event) => dayjs(event.date).isBefore(dayjs(), "day") // Compare by date only
  );

  // Pagination Logic
  const totalPages = Math.ceil(upcomingEvents.length / eventsPerPage);
  const startIndex = (currentPage - 1) * eventsPerPage;
  const currentEvents = upcomingEvents.slice(
    startIndex,
    startIndex + eventsPerPage
  );

  const nextPage = () =>
    setCurrentPage((prev) => Math.min(prev + 1, totalPages));
  const prevPage = () => setCurrentPage((prev) => Math.max(prev - 1, 1));
  const n = currentEvents.length;
  if (isLoading) return <p className="text-center">Loading events...</p>;
  if (error)
    return <p className="text-center text-red-500">Error loading events.</p>;

  return (
    <div className="p-10">
      {empty(n) && (
        <h1 className="text-4xl font-bold text-center mb-10">Past Events</h1>
      )}
      {empty(n) && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {currentEvents.map((event) => (
            <EventCard key={event.id} event={event} />
          ))}
        </div>
      )}
      {/* Pagination Controls */}
      {Page(totalPages) && (
        <div className="flex justify-center mt-10 space-x-6">
          <button
            onClick={prevPage}
            disabled={currentPage === 1}
            className={`px-4 py-2 rounded ${
              currentPage === 1 ? "bg-gray-300" : "bg-blue-600 text-white"
            }`}
          >
            Previous
          </button>
          <span className="text-xl font-medium">
            Page {currentPage} of {totalPages}
          </span>
          <button
            onClick={nextPage}
            disabled={currentPage === totalPages}
            className={`px-4 py-2 rounded ${
              currentPage === totalPages
                ? "bg-gray-300"
                : "bg-blue-600 text-white"
            }`}
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
}
export default PassedList;
