import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './MyJobs.css';

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
        <div className='container'>
            <div className='header'>
                <h1>All my jobs</h1>
                </div>
                <div className='search-container'>
                <input
                    type='text'
                    name='search'
                    id='search'
                    value={searchText}
                    onChange={(e) => setSearchText(e.target.value)}
                    placeholder='Search jobs by title'
                    className='search-input'
                />
                <button
                    className='search-button'
                    onClick={handleSearch}
                >
                    Search
                </button>
            </div>
            <section className="job-container">
                <div className="job-header">
                    <h3>All Jobs</h3>
                    <Link to="/post-job">
                        <button className="post-job-button">
                            POST A NEW JOB
                        </button>
                    </Link>
                </div>
                <div className="table-container">
                    <table>
                        <thead>
                            <tr>
                                <th>NO.</th>
                                <th>TITLE</th>
                                <th>COMPANY NAME</th>
                                <th>SALARY</th>
                                <th>EDIT</th>
                                <th>DELETE</th>
                            </tr>
                        </thead>
                        <tbody>
                            {isLoading ? (
                                <tr>
                                    <td colSpan="6">Loading...</td>
                                </tr>
                            ) : (
                                currentJobs.map((job, index) => (
                                    <tr key={job._id}>
                                        <td>{indexOfFirstItem + index + 1}</td>
                                        <td>{job.jobTitle}</td>
                                        <td>{job.companyName}</td>
                                        <td>${job.minPrice}-${job.maxPrice}</td>
                                        <td>
                                            <button 
                                                className="edit-button"
                                                onClick={() => handleEdit(job._id)}
                                            >
                                                EDIT
                                            </button>
                                        </td>
                                        <td>
                                            <button 
                                                className="delete-button"
                                                onClick={() => handleDelete(job._id)}
                                            >
                                                Delete
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
                <div className='pagination'>
                    {currentPage > 1 && (
                        <button 
                            className='pagination-button'
                            onClick={prevPage}
                        >
                            Previous
                        </button>
                    )}
                    {indexOfLastItem < filteredJobs.length && (
                        <button 
                            className='pagination-button'
                            onClick={nextPage}
                        >
                            Next
                        </button>
                    )}
                </div>
            </section>
        </div>
    );
};

export default MyJobs;
