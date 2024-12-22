import React from "react";

function Filter({ filterField, options, onFilterChange }) {
  const [selectedFilter, setSelectedFilter] = React.useState("All");

  const handleClick = (value) => {
    setSelectedFilter(value);
    onFilterChange(value); // Call the callback function to update the state in DiscountList
  };

  return (
    <div className="flex gap-2 p-2 border border-gray-200 bg-gray-50 rounded shadow-sm w-min">
      {options.map((option) => (
        <button
          key={option.value}
          onClick={() => handleClick(option.value)}
          className={`px-3 py-1 text-sm font-medium rounded transition-colors ${
            option.value === selectedFilter
              ? "bg-blue-600 text-white"
              : "bg-white text-gray-700 hover:bg-blue-600 hover:text-white"
          }`}
        >
          {option.label}
        </button>
      ))}
    </div>
  );
}

export default Filter;
