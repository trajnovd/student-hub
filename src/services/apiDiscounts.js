import supabase from "./supabase";

export async function fetchDiscounts() {
  const { data, error } = await supabase.from("discounts").select("*");

  if (error) {
    console.error("Error fetching discounts:", error);
  }

  return data;
}
