import { useState } from "react";
import { BiChevronLeft, BiChevronRight } from "react-icons/bi";

import dayjs from "dayjs";
import { useFetchScholarships } from "../scholarships/useScholarships";
import ScholarshipCard from "../scholarships/ScholarshipCard";

function HomeScholarships() {
  const { data: scholarships = [], isLoading, error } = useFetchScholarships();
  const [currentIndex, setCurrentIndex] = useState(0);

  // Sort scholarships to show non-expired first
  const sortedScholarships = scholarships.slice().sort((a, b) => {
    const today = dayjs();
    const isAExpired = dayjs(a.deadline).isBefore(today);
    const isBExpired = dayjs(b.deadline).isBefore(today);

    if (isAExpired && !isBExpired) return 1;
    if (!isAExpired && isBExpired) return -1;
    return dayjs(a.deadline).diff(dayjs(b.deadline));
  });

  const nextScholarship = () => {
    setCurrentIndex((prev) => (prev + 1) % sortedScholarships.length);
  };

  const prevScholarship = () => {
    setCurrentIndex((prev) =>
      prev === 0 ? sortedScholarships.length - 1 : prev - 1
    );
  };

  if (isLoading) return <p className="text-center">Loading scholarships...</p>;
  if (error)
    return (
      <p className="text-center text-red-500">Error loading scholarships.</p>
    );

  return (
    <>
      <div className="text-center mb-12 bg-gradient-to-r from-blue-50 to-blue-100">
        <h2 className="text-4xl font-extrabold text-blue-600 py-10">
          Explore Exclusive Scholarships
        </h2>
      </div>
      <section className="py-16 bg-gradient-to-r from-blue-50 to-blue-100">
        <div className="max-w-7xl mx-auto px-6">
          <div className="relative w-full h-[600px] flex items-center justify-center">
            {sortedScholarships.length > 0 && (
              <ScholarshipCard scholarship={sortedScholarships[currentIndex]} />
            )}

            {/* Navigation */}
            <div className="absolute top-1/2 left-8 transform -translate-y-1/2">
              <button
                onClick={prevScholarship}
                className="p-4 bg-white rounded-full shadow hover:bg-gray-200 transition"
              >
                <BiChevronLeft className="w-8 h-8 text-blue-600" />
              </button>
            </div>

            <div className="absolute top-1/2 right-8 transform -translate-y-1/2">
              <button
                onClick={nextScholarship}
                className="p-4 bg-white rounded-full shadow hover:bg-gray-200 transition"
              >
                <BiChevronRight className="w-8 h-8 text-blue-600" />
              </button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default HomeScholarships;
