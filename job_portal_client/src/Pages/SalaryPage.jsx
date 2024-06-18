import React, { useEffect, useState } from 'react';
import PageHeader from '../components/PageHeader';

const SalaryPage = () => {
    const [searchText, setSearchText] = useState("");
    const [salary, setSalary] = useState([]);
    const [filtered, setFiltered] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch("salary.json")
            .then(res => res.json())
            .then(data => {
                console.log(data); // Log the fetched data
                setSalary(data);
                setFiltered(data);
                setLoading(false); // Set loading to false after fetching data
            });
    }, [searchText]);

    const handleSearch = () => {
        const filtered = searchText
            ? salary.filter(
                  (job) =>
                      job.title.toLowerCase().includes(searchText.toLowerCase())
              )
            : salary;
        setFiltered(filtered);
    };

    return (
        <div className='max-w-screen-2x1 container mx-auto px-4 py-6'>
            <PageHeader title={"Estimate salary"} path={"Salary"} />
            <div className='flex justify-center mt-6'>
                <input
                    type='text'
                    name='search'
                    id='search'
                    value={searchText}
                    onChange={(e) => setSearchText(e.target.value)}
                    placeholder='Search jobs by title'
                    className='py-2 px-4 border border-gray-300 rounded-l-md focus:outline-none focus:border-blue-500 lg:w-1/3 w-full'
                />
                <button
                    className='bg-black text-white font-semibold px-4 py-2 rounded-r-md hover:bg-blue-600 transition duration-150'
                    onClick={handleSearch}
                >
                    Search
                </button>
            </div>
            {/* Salary display cards */}
            <div className='grid lg:grid-cols-3 md:grid-cols-2 gap-4 mt-6'>
                {loading ? (
                    <div className="col-span-full text-center text-black">Loading...</div>
                ) : (
                    filtered.map(job => (
                        <div key={job.id} className='bg-white shadow-lg rounded-lg p-4 mb-4'>
                            <h3 className='text-lg font-semibold mb-2 text-blue-500'>{job.title}</h3>
                            <p className='text-sm text-black'>Salary: <span className='text-green-500'>{job.salary}</span></p>
                            <p className='text-sm text-black'>Status: <span className='text-red-500'>{job.status}</span></p>
                            <p className='text-sm text-black'>Skills: <span className='text-yellow-500'>{job.skills}</span></p>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
};

export default SalaryPage;
