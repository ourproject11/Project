import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Banner from "../components/Banner";
import Card from "../components/Card";

const Home = ({ role }) => {
  const [jobs, setJobs] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 7;

  useEffect(() => {
    setIsLoading(true);
    fetch("http://localhost:3000/all-jobs")
      .then((res) => res.json())
      .then((data) => {
        setJobs(data);
        setIsLoading(false);
      });
  }, []);

  // Handle form submission for search
  const handleSearch = (event) => {
    event.preventDefault();
    setCurrentPage(1); // Reset to the first page on new search
  };

  // Filter jobs by company name
  const filteredItems = jobs.filter((job) => {
    const company = job.companyName || ""; // Assuming companyName is the correct property
    return company.toLowerCase().includes(searchText.toLowerCase());
  });

  // Calculate the total number of pages
  const totalPages = Math.ceil(filteredItems.length / itemsPerPage);

  // Calculate the index range for pagination
  const calculatePageRange = () => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return { startIndex, endIndex };
  };

  // Function for next page
  const nextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  // Function for previous page
  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  // Determine if next and previous buttons should be disabled
  const isNextDisabled = () => {
    return currentPage === totalPages || totalPages === 0;
  };

  const isPrevDisabled = () => {
    return currentPage === 1;
  };

  // Main function to filter and paginate data
  const paginatedItems = () => {
    const { startIndex, endIndex } = calculatePageRange();
    return filteredItems.slice(startIndex, endIndex);
  };

  return (
    <div className="bg-gray-100 min-h-screen">
      <Banner
        handleSearch={handleSearch}
        searchText={searchText}
        setSearchText={setSearchText}
      />

      <div className="container mx-auto px-4 py-8">
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {/* Job Listings and Pagination */}
          <div className="col-span-2 lg:col-span-3">
            <div className="bg-white rounded-lg shadow-md p-4">
              {isLoading ? (
                <p className="font-medium text-center">Loading...</p>
              ) : filteredItems.length > 0 ? (
                paginatedItems().map((job, index) => (
                  <Card key={index} data={job} />
                ))
              ) : (
                <div className="text-center">
                  <h3 className="text-lg font-bold mb-2">No Jobs Found</h3>
                </div>
              )}

              {/* Pagination */}
              {filteredItems.length > 0 && (
                <div className="flex justify-center mt-4 space-x-8">
                  <button
                    onClick={prevPage}
                    disabled={isPrevDisabled()}
                    className={`bg-cherry hover:bg-darkred text-white py-2 px-4 rounded-md focus:outline-none ${isPrevDisabled() ? 'opacity-50 cursor-not-allowed' : ''}`}
                  >
                    Previous
                  </button>
                  <span className="self-center">
                    Page {currentPage} of {totalPages}
                  </span>
                  <button
                    onClick={nextPage}
                    disabled={isNextDisabled()}
                    className={`bg-cherry hover:bg-darkred text-white py-2 px-4 rounded-md focus:outline-none ${isNextDisabled() ? 'opacity-50 cursor-not-allowed' : ''}`}
                  >
                    Next
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Role-specific content */}
        <div className="role-specific-content">
          {role === "candidate" && (
            <div className="candidate-content">
              {/* Add any candidate-specific content here */}
            </div>
          )}
          {role === "employee" && (
            <div className="employee-content">
              <nav>
                <Link to="/my-jobs">My Jobs</Link>
                <Link to="/salary">Salary</Link>
                <Link to="/post-job">Post a Job</Link>
              </nav>
              {/* Add any employee-specific content here */}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;
