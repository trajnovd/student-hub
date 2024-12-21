import React from "react";
import { motion } from "framer-motion";

import dayjs from "dayjs";
import { FaExternalLinkAlt } from "react-icons/fa";

function ScholarshipCard({ scholarship }) {
  const isExpired = dayjs(scholarship.deadline).isBefore(dayjs());

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ scale: 1.02 }}
      className={`relative w-full h-screen flex flex-col justify-center items-center 
        ${
          isExpired
            ? "bg-gray-300"
            : "bg-gradient-to-r from-blue-500 to-blue-700"
        }
        text-white rounded-lg shadow-xl overflow-hidden p-8`}
    >
      <div className="max-w-4xl">
        <h1 className="text-5xl font-extrabold">{scholarship.title}</h1>
        <p className="mt-6 text-lg leading-relaxed">
          {scholarship.description}
        </p>

        <div className="flex flex-wrap gap-4 mt-8">
          <span className="px-4 py-2 bg-blue-800 rounded-lg">
            {scholarship.provider}
          </span>
          <span className="px-4 py-2 bg-blue-600 rounded-lg">
            Eligibility: {scholarship.eligibility}
          </span>
          <span
            className={`px-4 py-2 rounded-lg ${
              isExpired ? "bg-red-500" : "bg-green-500"
            }`}
          >
            {isExpired
              ? "Expired"
              : `Deadline: ${dayjs(scholarship.deadline).format(
                  "MMMM D, YYYY"
                )}`}
          </span>
        </div>

        {/* External Link */}
        <div className="mt-12">
          <a
            href={scholarship.url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-white text-blue-700 px-6 py-3 rounded-lg text-lg font-semibold hover:bg-gray-200 transition"
          >
            Apply Now
            <FaExternalLinkAlt className="w-6 h-6" />
          </a>
        </div>
      </div>
    </motion.div>
  );
}

export default ScholarshipCard;
