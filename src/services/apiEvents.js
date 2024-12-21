import supabase from "./supabase";

// Fetch Events
const today = new Date();
const tenDaysAgo = new Date();
tenDaysAgo.setDate(today.getDate() - 10);
export async function fetchEvents() {
  const { data, error } = await supabase
    .from("events")
    .select("*")
    .or(
      `date.gte.${today.toISOString()},and(date.lt.${today.toISOString()},date.gte.${tenDaysAgo.toISOString()})`
    )
    .order("date", { ascending: true });
  if (error) throw new Error(error.message);
  return data;
}

// Update Event (Mark as Finished)
export async function updateEvent(eventId, updates) {
  const { data, error } = await supabase
    .from("events")
    .update(updates)
    .eq("id", eventId)
    .select();

  if (error) throw new Error(error.message);
  return data;
}

// Delete Event
export async function deleteEvent(eventId) {
  const { error } = await supabase.from("events").delete().eq("id", eventId);

  if (error) throw new Error(error.message);
  return true;
}
