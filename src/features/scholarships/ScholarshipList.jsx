import React, { useState } from "react";
import { useFetchScholarships } from "./useScholarships";
import ScholarshipCard from "./ScholarshipCard";
import { BiChevronLeft, BiChevronRight } from "react-icons/bi";
import dayjs from "dayjs";
import Spinner from "../../ui/Spinner";

function ScholarshipList() {
  const { data: scholarships = [], isLoading, error } = useFetchScholarships();
  const [currentIndex, setCurrentIndex] = useState(0);

  // Sort Scholarships - non-expired first
  const sortedScholarships = scholarships.slice().sort((a, b) => {
    const today = dayjs();
    const isAExpired = dayjs(a.deadline).isBefore(today);
    const isBExpired = dayjs(b.deadline).isBefore(today);

    if (isAExpired && !isBExpired) return 1; // Move A to the end
    if (!isAExpired && isBExpired) return -1; // Keep B at the top
    return dayjs(a.deadline).diff(dayjs(b.deadline)); // Sort by soonest deadline
  });

  const nextScholarship = () => {
    setCurrentIndex((prev) => (prev + 1) % sortedScholarships.length);
  };

  const prevScholarship = () => {
    setCurrentIndex((prev) =>
      prev === 0 ? sortedScholarships.length - 1 : prev - 1
    );
  };

  if (isLoading) return <Spinner />;
  if (error)
    return (
      <p className="text-center text-red-500">Error loading scholarships.</p>
    );

  return (
    <div className="relative w-full h-screen">
      {sortedScholarships.length > 0 && (
        <>
          <ScholarshipCard scholarship={sortedScholarships[currentIndex]} />

          {/* Navigation */}
          <div className="absolute top-1/2 left-4 transform -translate-y-1/2">
            <button
              onClick={prevScholarship}
              className="p-4 bg-white rounded-full shadow hover:bg-gray-200 transition"
            >
              <BiChevronLeft className="w-6 h-6 text-blue-700" />
            </button>
          </div>

          <div className="absolute top-1/2 right-4 transform -translate-y-1/2">
            <button
              onClick={nextScholarship}
              className="p-4 bg-white rounded-full shadow hover:bg-gray-200 transition"
            >
              <BiChevronRight className="w-6 h-6 text-blue-700" />
            </button>
          </div>
        </>
      )}
    </div>
  );
}

export default ScholarshipList;
