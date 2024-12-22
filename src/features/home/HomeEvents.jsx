import React from "react";
import dayjs from "dayjs";
import EventCard from "../events/EventCard";
import { useFetchEvents } from "../events/useEvents";

const HomeScreen = () => {
  const { data: events, isLoading, error } = useFetchEvents();

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      <h1 className="text-4xl font-bold mb-6 text-indigo-600">
        Upcoming Events Nearby
      </h1>

      <a
        href="./events"
        className="flex overflow-x-auto gap-4 mt-6 w-full max-w-4xl p-4 bg-white shadow-md rounded-lg"
      >
        {events
          .filter((event) => dayjs(event.date).isAfter(dayjs())) // Exclude passed events
          .slice(0, 3) // Limit to 3 events
          .map((event) => (
            <EventCard key={event.id} event={event} />
          ))}
      </a>
    </div>
  );
};

export default HomeScreen;
