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
        <div className='max-w-screen-2x1 container mx-auto x1:px-24 px-4'>
            <PageHeader title={"Estimate salary"} path={"Salary"} />
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
            {/* Salary display cards */}
            <div className='grid lg:grid-cols-3 md:grid-cols-2 gap-4'>
                {loading ? (
                    <div>Loading...</div>
                ) : (
                    filtered.map(job => (
                        <div key={job.id} className='bg-white shadow-lg rounded-lg p-4'>
                            <h3 className='text-lg font-semibold mb-2 text-blue'>{job.title}</h3>
                            <p className='text-sm text-gray-600 text-green'>Salary: {job.salary}</p>
                            <p className='text-sm text-gray-600 text-red'>Status: {job.status}</p>
                            <p className='text-sm text-gray-600 text-yellow'>Skills: {job.skills}</p>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
};

export default SalaryPage;
