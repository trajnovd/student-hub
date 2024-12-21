import React from "react";
import dayjs from "dayjs";

// Event Card Component
function EventCard({ event }) {
  const isPastEvent = dayjs(event.date).isBefore(dayjs());

  return (
    <div
      className={`rounded-lg shadow-lg overflow-hidden transition transform hover:scale-105
        ${isPastEvent ? "bg-gray-200 opacity-60" : "bg-white"}`}
    >
      <img
        src={event.image_url || "https://via.placeholder.com/400"}
        alt={event.title}
        className="w-full h-60 object-cover"
      />
      <div className="p-6">
        <h3 className="text-2xl font-semibold">{event.title}</h3>
        <p className="text-sm text-gray-600">{event.description}</p>
        <div className="mt-4">
          <p className="text-lg">📍 {event.location}</p>
          <p className="text-md text-gray-500">
            📅 {dayjs(event.date).format("MMMM D, YYYY")} | 🕒 {event.time}
          </p>
        </div>
        {isPastEvent && (
          <p className="text-red-500 font-bold mt-4">Event Passed</p>
        )}
      </div>
    </div>
  );
}

export default EventCard;
