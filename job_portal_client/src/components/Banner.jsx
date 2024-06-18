import React from "react";

const Banner = ({ handleSearch, searchText, setSearchText }) => {
  return (
    <div className="bg-gray-200 p-4 mb-4 rounded-lg text-center">
      <form onSubmit={handleSearch} className="flex items-center justify-center">
        <input
          type="text"
          placeholder="Search by company name..."
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          className="px-4 py-2 w-full rounded-l-md border border-gray-300 focus:outline-none"
          style={{ maxWidth: "400px" }} // Adjust the width as needed
        />
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-r-md focus:outline-none"
        >
          Search
        </button>
      </form>
    </div>
  );
};

export default Banner;
