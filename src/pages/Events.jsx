import EventList from "../features/events/EventList";
import PassedList from "../features/events/PassedList";
function Events() {
  return (
    <div>
      <EventList category="Party" />
      <EventList category="Workshop" />
      <EventList category="Competition" />
      <PassedList />
    </div>
  );
}

export default Events;
