import React from "react";
import { useForm } from "react-hook-form";
import { useStudents } from "./useStudents";

function CreateStudentForm({ onSuccess, onError }) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const { mutate, isLoading } = useStudents();

  const onSubmit = (data) => {
    mutate(data, {
      onSuccess: () => {
        onSuccess();
        reset();
      },
      onError: () => {
        onError();
      },
    });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      {/* Full Name */}
      <div>
        <label className="block text-lg font-medium">Full Name</label>
        <input
          type="text"
          {...register("name", { required: "Full Name is required" })}
          className="w-full p-3 border rounded-lg"
          placeholder="John Doe"
        />
        {errors.name && (
          <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
        )}
      </div>

      {/* Email */}
      <div>
        <label className="block text-lg font-medium">Email</label>
        <input
          type="email"
          {...register("email", {
            required: "Email is required",
            pattern: {
              value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
              message: "Invalid email address",
            },
          })}
          className="w-full p-3 border rounded-lg"
          placeholder="john.doe@example.com"
        />
        {errors.email && (
          <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
        )}
      </div>

      {/* Phone Number */}
      <div>
        <label className="block text-lg font-medium">Phone Number</label>
        <input
          type="text"
          {...register("phone")}
          className="w-full p-3 border rounded-lg"
          placeholder="+389 70 123 456"
        />
      </div>

      {/* Faculty and Year */}
      <div>
        <label className="block text-lg font-medium">Faculty & Year</label>
        <input
          type="text"
          {...register("faculty_and_year", {
            required: "Faculty and Year are required",
          })}
          className="w-full p-3 border rounded-lg"
          placeholder="Computer Science, Year 3"
        />
        {errors.faculty_and_year && (
          <p className="text-red-500 text-sm mt-1">
            {errors.faculty_and_year.message}
          </p>
        )}
      </div>

      {/* Submit Button */}
      <div className="text-center">
        <button
          type="submit"
          disabled={isLoading}
          className="bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 transition"
        >
          {isLoading ? "Submitting..." : "Subscribe"}
        </button>
      </div>
    </form>
  );
}

export default CreateStudentForm;
