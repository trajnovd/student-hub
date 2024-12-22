import React, { useState } from "react";
import { empty, useFetchEvents, Page } from "./useEvents";
import EventCard from "./EventCard";
import dayjs from "dayjs";
function EventList({ category }) {
  const { data: events = [], isLoading, error } = useFetchEvents();
  const [currentPage, setCurrentPage] = useState(1);
  const eventsPerPage = 3; // 3 per row, 2 rows
  const upcomingEvents = events.filter((event) =>
    dayjs(event.date).isAfter(dayjs())
  );

  // Pagination Logic
  const totalPages = Math.ceil(
    upcomingEvents.filter((event) => event.category === category).length /
      eventsPerPage
  );

  const startIndex = (currentPage - 1) * eventsPerPage;
  const currentEvents = upcomingEvents
    .filter((event) => event.category === category)
    .slice(startIndex, startIndex + eventsPerPage);

  const nextPage = () =>
    setCurrentPage((prev) => Math.min(prev + 1, totalPages));
  const prevPage = () => setCurrentPage((prev) => Math.max(prev - 1, 1));
  const n = currentEvents.filter((event) => event.category === category).length;
  if (isLoading) return <p className="text-center">Loading events...</p>;
  if (error)
    return <p className="text-center text-red-500">Error loading events.</p>;
  const title = category === "Party" ? "Partie" : category;
  return (
    <div className="p-10">
      {empty(n) && (
        <h1 className="text-4xl font-bold text-center mb-10">{title}s</h1>
      )}
      {empty(n) && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {currentEvents
            .filter((event) => event.category === category)
            .map((event) => (
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

export default EventList;
