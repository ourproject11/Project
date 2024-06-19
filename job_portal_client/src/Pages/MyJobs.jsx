import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const MyJobs = () => {
    const email = "jai.prakshnryn@gmail.com";
    const [jobs, setJobs] = useState([]);
    const [filteredJobs, setFilteredJobs] = useState([]);
    const [searchText, setSearchText] = useState("");
    const [isLoading, setIsLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 4;
    const navigate = useNavigate();

    useEffect(() => {
        setIsLoading(true);
        fetch(`http://localhost:3000/myJobs/${email}`)
            .then(response => {
                if (response.ok) {
                    return response.json();
                }
                throw new Error('Network response was not ok.');
            })
            .then(data => {
                setJobs(data);
                setFilteredJobs(data);
                setIsLoading(false);
            })
            .catch(error => {
                console.error('There was a problem fetching the data:', error);
                setIsLoading(false);
            });
    }, [email]);

    useEffect(() => {
        handleSearch();
    }, [searchText]);

    const handleSearch = () => {
        const filtered = jobs.filter(job =>
            job.jobTitle.toLowerCase().includes(searchText.toLowerCase())
        );
        setFilteredJobs(filtered);
        setCurrentPage(1); // Reset to the first page after search
    };

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentJobs = filteredJobs.slice(indexOfFirstItem, indexOfLastItem);

    const nextPage = () => {
        if (indexOfLastItem < filteredJobs.length) {
            setCurrentPage(prevPage => prevPage + 1);
        }
    };

    const prevPage = () => {
        if (currentPage > 1) {
            setCurrentPage(prevPage => prevPage - 1);
        }
    };

    const handleDelete = (id) => {
        fetch(`http://localhost:3000/job/${id}`, {
            method: "DELETE"
        }).then(response => response.json())
          .then(data => {
              if (data.acknowledged === true) {
                  alert("Your job was deleted successfully!");
                  const updatedJobs = jobs.filter(job => job._id !== id);
                  setJobs(updatedJobs);
                  setFilteredJobs(updatedJobs);
              }
          })
          .catch(error => {
              console.error('There was a problem deleting the job:', error);
          });
    };

    const handleEdit = (id) => {
        navigate(`/edit-job/${id}`);
    };

    const viewApplicants = (jobId) => {
        navigate(`/applicants/${jobId}`);
    };

    return (
        <div className='bg-black max-w-screen-2xl container mx-auto px-4 py-6'>
            <div className='text-left mb-6'>
                <h1 className='text-3xl font-bold text-white text-center'>All My Jobs</h1>
                <div className='flex justify-center mt-4'>
                    <input
                        type='text'
                        name='search'
                        id='search'
                        value={searchText}
                        onChange={(e) => setSearchText(e.target.value)}
                        placeholder='Search jobs by title'
                        className='bg-black py-2 px-4 border border-gray-300 rounded-l-md focus:outline-none focus:border-blue-500 lg:w-1/3 w-full'
                    />
                    <button
                        className='bg-white text-black font-semibold px-4 py-2 rounded-r-md'
                        onClick={handleSearch}
                    >
                        Search
                    </button>
                </div>
            </div>
            <section className="bg-black p-4 rounded-lg shadow-lg">
                <div className="flex justify-between items-center mb-4">
                    <h3 className="text-xl font-bold text-white">All Jobs</h3>
                    <Link to="/post-job">
                        <button className="bg-cherry text-white font-bold px-4 py-2 rounded hover:bg-darkred transition duration-150">
                            POST A NEW JOB
                        </button>
                    </Link>
                </div>
                <div className="overflow-x-auto">
                    <table className="min-w-full bg-black">
                        <thead>
                            <tr>
                                <th className="px-6 py-3 border-b border-gray-200 bg-black text-left text-xs font-bold text-white uppercase tracking-wider">
                                    NO.
                                </th>
                                <th className="px-6 py-3 border-b border-gray-200 bg-black text-left text-xs font-bold text-white uppercase tracking-wider">
                                    TITLE
                                </th>
                                <th className="px-6 py-3 border-b border-gray-200 bg-black text-left text-xs font-bold text-white uppercase tracking-wider">
                                    COMPANY NAME
                                </th>
                                <th className="px-6 py-3 border-b border-gray-200 bg-black text-left text-xs font-bold text-white uppercase tracking-wider">
                                    SALARY
                                </th>
                                <th className="px-6 py-3 border-b border-gray-200 bg-black text-left text-xs font-bold text-white uppercase tracking-wider">
                                    APPLICANTS
                                </th>
                                <th className="px-6 py-3 border-b border-gray-200 bg-black text-left text-xs font-bold text-white uppercase tracking-wider">
                                    EDIT
                                </th>
                                <th className="px-6 py-3 border-b border-gray-200 bg-black text-left text-xs font-bold text-white uppercase tracking-wider">
                                    DELETE
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {isLoading ? (
                                <tr>
                                    <td colSpan="7" className="text-center py-4">Loading...</td>
                                </tr>
                            ) : (
                                currentJobs.map((job, index) => (
                                    <tr key={job._id}>
                                        <td className="px-6 py-4 whitespace-nowrap border-b border-gray-200 text-sm text-white text-left">
                                            {indexOfFirstItem + index + 1}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap border-b border-gray-200 text-sm text-white text-left">
                                            {job.jobTitle}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap border-b border-gray-200 text-sm text-white text-left">
                                            {job.companyName}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap border-b border-gray-200 text-sm text-white text-left">
                                            ${job.minPrice}-{job.maxPrice}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap border-b border-gray-200 text-sm text-left">
                                            <button 
                                                className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600 transition duration-150"
                                                onClick={() => viewApplicants(job._id)}
                                            >
                                                View Applicants
                                            </button>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap border-b border-gray-200 text-sm text-left">
                                            <button 
                                                className="bg-yellow text-black px-3 py-1 rounded hover:bg-yellow transition duration-150"
                                                onClick={() => handleEdit(job._id)}
                                            >
                                                EDIT
                                            </button>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap border-b border-gray-200 text-sm text-left">
                                            <button onClick={() => handleDelete(job._id)} className="bg-cherry text-white px-3 py-1 rounded hover:bg-darkred transition duration-150">Delete</button>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </section>
            {/* Pagination */}
            <div className='flex justify-center mt-6 space-x-4'>
                {currentPage > 1 && (
                    <button 
                        className='bg-white text-black px-4 py-2 rounded hover:bg-gray-300 transition duration-150'
                        onClick={prevPage}
                    >
                        Previous
                    </button>
                )}
                {indexOfLastItem < filteredJobs.length && (
                    <button 
                        className='bg-gray-200 text-gray-700 px-4 py-2 rounded hover:bg-gray-300 transition duration-150'
                        onClick={nextPage}
                    >
                        Next
                    </button>
                )}
            </div>
        </div>
    );
};

export default MyJobs;
