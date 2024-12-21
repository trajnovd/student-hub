import supabase from "./supabase";

export async function fetchScholarships() {
  const { data, error } = await supabase
    .from("scholarships")
    .select("*")
    .order("deadline", { ascending: true }); // Soonest deadlines first

  if (error) {
    console.error("Error fetching scholarships:", error.message);
    throw error;
  }
  return data;
}
