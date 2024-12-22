import React from "react";
import { useForm } from "react-hook-form";
import { useStudents } from "../newsletter/useStudents";
import { toast } from "react-toastify";

function HomeNewsletter() {
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
        toast.success("You've successfully subscribed to the newsletter!");
        reset();
      },
      onError: () => {
        toast.error("Subscription failed. Please try again.");
      },
    });
  };

  return (
    <div className="bg-gray-100 py-12 px-6 text-center">
      <h2 className="text-3xl font-bold text-indigo-700">
        Stay Updated with Student Hub
      </h2>
      <p className="mt-2 text-gray-600">
        Subscribe to get the latest events, discounts, and scholarships directly
        in your inbox.
      </p>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-4xl mx-auto"
      >
        {/* Name */}
        <div>
          <input
            type="text"
            {...register("name", { required: "Full Name is required" })}
            className="w-full p-3 border rounded-lg"
            placeholder="Full Name"
          />
          {errors.name && (
            <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
          )}
        </div>

        {/* Email */}
        <div>
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
            placeholder="Email Address"
          />
          {errors.email && (
            <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
          )}
        </div>

        <div>
          <input
            type="text"
            {...register("phone")}
            className="w-full p-3 border rounded-lg"
            placeholder="+389 70 123 456"
          />
          {errors.phone && (
            <p className="text-red-500 text-sm mt-1">{errors.phone.message}</p>
          )}
        </div>
        {/* Faculty and Year */}
        <div>
          <input
            type="text"
            {...register("faculty_and_year", {
              required: "Faculty and Year are required",
            })}
            className="w-full p-3 border rounded-lg"
            placeholder="Faculty and Year"
          />
          {errors.faculty_and_year && (
            <p className="text-red-500 text-sm mt-1">
              {errors.faculty_and_year.message}
            </p>
          )}
        </div>

        {/* Submit Button */}
        <div className="col-span-1 md:col-span-2 lg:col-span-4">
          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-indigo-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-indigo-700 transition"
          >
            {isLoading ? "Submitting..." : "Subscribe"}
          </button>
        </div>
      </form>
    </div>
  );
}

export default HomeNewsletter;
