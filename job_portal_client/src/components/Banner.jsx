import React from "react";

const Banner = ({ handleSearch, searchText, setSearchText }) => {
  return (
    <div className="bg-darkblue p-4 mb-4 rounded-lg text-center">
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
          className="bg-cherry hover:bg-darkred text-black px-4 py-2 rounded-r-md focus:outline-none"
        >
          Search
        </button>
      </form>
    </div>
  );
};

export default Banner;
