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

    return (
        <div className='max-w-screen-2xl container mx-auto px-4'>
            <div className='my-jobs-container'>
                <h1 className='text-center p-4'>All my jobs</h1>
                <div className='search-box p-2 text-center mb-2'>
                    <input
                        type='text'
                        name='search'
                        id='search'
                        value={searchText}
                        onChange={(e) => setSearchText(e.target.value)}
                        className='py-2 pl-3 border focus:outline-none lg:w-6/12 mb-4 w-full'
                    />
                    <button className='bg-blue text-white font-semibold px-8 py-2 rounded-sm mb-4' onClick={handleSearch}>
                        Search
                    </button>
                </div>
            </div>
            <section className="py-1 bg-blueGray-50">
                <div className="w-full xl:w-8/12 mb-12 xl:mb-0 px-4 mx-auto mt-5">
                    <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded">
                        <div className="rounded-t mb-0 px-4 py-3 border-0">
                            <div className="flex flex-wrap items-center">
                                <div className="relative w-full px-4 max-w-full flex-grow flex-1">
                                    <h3 className="font-semibold text-base text-blueGray-700">All Jobs</h3>
                                </div>
                                <div className="relative w-full px-4 max-w-full flex-grow flex-1 text-right">
                                    <Link to="/post-job">
                                        <button className="bg-indigo-500 text-white active:bg-indigo-600 text-xs font-bold uppercase px-3 py-1 rounded outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150" type="button">
                                            POST A NEW JOB
                                        </button>
                                    </Link>
                                </div>
                            </div>
                        </div>
                        <div className="block w-full overflow-x-auto">
                            <table className="items-center bg-transparent w-full border-collapse">
                                <thead>
                                    <tr>
                                        <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                                            NO.
                                        </th>
                                        <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                                            TITLE
                                        </th>
                                        <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                                            COMPANY NAME
                                        </th>
                                        <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                                            SALARY
                                        </th>
                                        <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                                            EDIT
                                        </th>
                                        <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                                            DELETE
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {isLoading ? (
                                        <tr>
                                            <td colSpan="6" className="text-center p-4">Loading...</td>
                                        </tr>
                                    ) : (
                                        currentJobs.map((job, index) => (
                                            <tr key={job._id}>
                                                <th className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-left text-blueGray-700">
                                                    {indexOfFirstItem + index + 1}
                                                </th>
                                                <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                                                    {job.jobTitle}
                                                </td>
                                                <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                                                    {job.companyName}
                                                </td>
                                                <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                                                    ${job.minPrice}-${job.maxPrice}
                                                </td>
                                                <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                                                    <button 
                                                        className="bg-yellow-500 text-white px-3 py-1 rounded"
                                                        onClick={() => handleEdit(job._id)}
                                                    >
                                                        EDIT
                                                    </button>
                                                </td>
                                                <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                                                    <button onClick={() => handleDelete(job._id)} className="bg-red-500 text-white px-3 py-1 rounded">Delete</button>
                                                </td>
                                            </tr>
                                        ))
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
                {/* Pagination */}
                <div className='flex justify-center text-black space-x-8'>
                    {currentPage > 1 && (
                        <button className='hover:underline' onClick={prevPage}>Previous</button>
                    )}
                    {indexOfLastItem < filteredJobs.length && (
                        <button className='hover:underline' onClick={nextPage}>Next</button>
                    )}
                </div>
            </section>
        </div>
    );
};

export default MyJobs;
