import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Banner from "../components/Banner";
import Jobs from "./Jobs";
import Card from "../components/Card";
import Sidebar from "../Sidebar/Sidebar";

const Home = ({ role }) => {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [jobs, setJobs] = useState([]);
  const [query, setQuery] = useState("");
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

  // Handle input change
  const handleInputChange = (event) => {
    setQuery(event.target.value);
  };

  // Filter jobs by title
  const filteredItems = jobs.filter(
    (job) =>
      job.jobTitle.toLowerCase().indexOf(query.toLowerCase()) !== -1
  );

  // Radio button and button-based filtering
  const handleChange = (event) => {
    setSelectedCategory(event.target.value);
  };

  const handleClick = (event) => {
    setSelectedCategory(event.target.value);
  };

  // Calculate the index range for pagination
  const calculatePageRange = () => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return { startIndex, endIndex };
  };

  // Function for next page
  const nextPage = () => {
    if (currentPage < Math.ceil(filteredItems.length / itemsPerPage)) {
      setCurrentPage(currentPage + 1);
    }
  };

  // Function for previous page
  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  // Main function to filter and paginate data
  const filteredData = (jobs, selected, query) => {
    let filteredJobs = jobs;

    // Filtering by input query
    if (query) {
      filteredJobs = filteredJobs.filter(
        (job) =>
          job.jobTitle &&
          job.jobTitle.toLowerCase().includes(query.toLowerCase())
      );
    }

    // Filtering by selected category
    if (selected) {
      filteredJobs = filteredJobs.filter(
        ({
          jobLocation,
          maxPrice,
          experienceLevel,
          salaryType,
          employmentType,
          postingDate,
        }) =>
          (jobLocation &&
            jobLocation.toLowerCase() === selected.toLowerCase()) ||
          (maxPrice && parseInt(maxPrice) <= parseInt(selected)) ||
          (postingDate && postingDate >= selected) ||
          (salaryType &&
            salaryType.toLowerCase() === selected.toLowerCase()) ||
          (experienceLevel &&
            experienceLevel.toLowerCase() === selected.toLowerCase()) ||
          (employmentType &&
            employmentType.toLowerCase() === selected.toLowerCase())
      );
    }

    // Slice the data based on current page
    const { startIndex, endIndex } = calculatePageRange();
    filteredJobs = filteredJobs.slice(startIndex, endIndex);
    return filteredJobs.map((data, i) => <Card key={i} data={data} />);
  };

  // Get filtered and paginated data
  const result = filteredData(jobs, selectedCategory, query);

  return (
    <div className="bg-gray-100 min-h-screen">
      <Banner query={query} handleInputChange={handleInputChange} />

      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          {/* Sidebar */}
          <div className="col-span-1">
            <Sidebar handleChange={handleChange} handleClick={handleClick} />
          </div>

          {/* Job Listings and Pagination */}
          <div className="col-span-2">
            <div className="bg-black rounded-lg shadow-md p-4">
              {isLoading ? (
                <p className="font-medium text-center">Loading...</p>
              ) : result.length > 0 ? (
                <Jobs result={result} />
              ) : (
                <div className="text-center">
                  <h3 className=" color-white text-lg font-bold mb-2">{result.length} Jobs</h3>
                  <p>No data found!</p>
                </div>
              )}

              {/* Pagination */}
              {result.length > 0 && (
                <div className="flex justify-center mt-4 space-x-8">
                  <button
                    onClick={prevPage}
                    disabled={currentPage === 1}
                    className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-md focus:outline-none"
                  >
                    Previous
                  </button>
                  <span className="self-center">
                    Page {currentPage} of {Math.ceil(filteredItems.length / itemsPerPage)}
                  </span>
                  <button
                    onClick={nextPage}
                    disabled={currentPage === Math.ceil(filteredItems.length / itemsPerPage)}
                    className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-md focus:outline-none"
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
              {/* <h2>Employee Specific Content</h2> */}
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
