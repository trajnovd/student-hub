import supabase from "./supabase";

// Insert a new student into the 'students' table
export const insertStudent = async (studentData) => {
  const { data, error } = await supabase.from("students").insert([studentData]);

  if (error) {
    throw new Error(error.message);
  }
  return data;
};
