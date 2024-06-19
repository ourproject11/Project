import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import ApplyForm from './ApplyForm'; // Import the ApplyForm component

const JobDetails = () => {
  const { id } = useParams();
  const [jobData, setJobData] = useState(null);
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    const fetchJobData = async () => {
      try {
        const response = await fetch(`http://localhost:3000/all-jobs/${id}`);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setJobData(data);
      } catch (error) {
        console.error('Error fetching job data:', error);
      }
    };

    fetchJobData();
  }, [id]);

  const handleApplyClick = () => {
    setShowForm(true); // Show the ApplyForm when the button is clicked
  };

  if (!jobData) {
    return <div className="text-center py-20 text-xl font-bold">Loading...</div>;
  }

  return (
    <div className="container mx-auto px-4 py-10">
      {showForm ? (
        <ApplyForm jobData={jobData} setShowForm={setShowForm} /> // Pass jobData and setShowForm as props to ApplyForm
      ) : (
        <div className="bg-black shadow-lg rounded-lg overflow-hidden">
          <div className="bg-gradient-to-r from-black via-cherry to-lightred text-white text-center py-6">
            <h2 className="text-4xl font-bold">{jobData.jobTitle}</h2>
            <p className="mt-2 text-xl">{jobData.companyName}</p>
          </div>
          <div className="p-6">
            <div className="mb-6">
              <h3 className="text-2xl font-bold mb-4">Job Details</h3>
              <p className="text-white mb-2">
                <span className="font-bold">Location:</span> {jobData.jobLocation}
              </p>
              <p className="text-white mb-2">
                <span className="font-bold">Salary:</span> {jobData.minPrice} - {jobData.maxPrice} ({jobData.salaryType})
              </p>
              <p className="text-white mb-2">
                <span className="font-bold">Experience Level:</span> {jobData.experienceLevel}
              </p>
              <p className="text-white mb-2">
                <span className="font-bold">Posted On:</span> {new Date(jobData.createdAt).toLocaleDateString()}
              </p>
              <p className="text-white mb-2">
                <span className="font-bold">Skills Required:</span> {jobData.skills.join(', ')}
              </p>
              <p className="text-white mt-4">
                <span className="font-bold">Description:</span> {jobData.description}
              </p>
            </div>
            <div className="text-center">
              <button
                onClick={handleApplyClick}
                className="bg-yellow text-black py-3 px-8 rounded-full text-lg font-bold hover:bg-black,text-white transition duration-300"
              >
                Apply for this Job
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default JobDetails;
