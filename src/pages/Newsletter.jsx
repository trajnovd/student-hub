import React from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import CreateStudentForm from "../features/newsletter/CreateStudentForm";

function Newsletter() {
  const handleSuccess = () => {
    toast.success("Successfully subscribed to the newsletter!");
  };

  const handleError = () => {
    toast.error("Failed to subscribe. Please try again.");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 to-indigo-200 flex items-center justify-center p-6">
      <div className="max-w-4xl w-full bg-white rounded-lg shadow-lg overflow-hidden">
        <div className="p-12 text-center">
          <h1 className="text-4xl font-extrabold text-blue-600 leading-tight">
            Stay in the Loop!
          </h1>
          <p className="mt-4 text-lg text-gray-600">
            Want to be the first to know when exciting events, exclusive
            discounts, or new scholarships are available?
          </p>
          <p className="mt-2 text-gray-500">
            Sign up to receive real-time updates and never miss out on an
            opportunity to enhance your student experience.
          </p>
        </div>

        {/* Form Section */}
        <div className="px-8 pb-12">
          <CreateStudentForm onSuccess={handleSuccess} onError={handleError} />
        </div>

        {/* Additional Info or CTA */}
        <div className="bg-blue-600 py-6 text-center text-white">
          <p className="text-lg">
            Be part of a growing community of students staying ahead!
          </p>
        </div>
      </div>

      {/* Toast Notifications */}
      <ToastContainer position="top-center" />
    </div>
  );
}

export default Newsletter;
