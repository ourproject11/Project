import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { auth, db } from '../firebase/firebase.config';
import { collection, query, where, getDocs } from 'firebase/firestore';

const AppliedJobs = () => {
  const location = useLocation();
  const message = location.state?.message;
  const [appliedJobs, setAppliedJobs] = useState([]);

  useEffect(() => {
    const fetchAppliedJobs = async () => {
      const user = auth.currentUser;
      if (user) {
        const q = query(collection(db, 'appliedJobs'), where('userId', '==', user.uid));
        const querySnapshot = await getDocs(q);
        const jobs = [];
        querySnapshot.forEach((doc) => {
          jobs.push({ id: doc.id, ...doc.data() });
        });
        setAppliedJobs(jobs);
      }
    };

    fetchAppliedJobs();
  }, []);

  return (
    <div className="container mx-auto px-4 py-10">
      {message && <p className="text-green-600 font-bold">{message}</p>}
      <h2 className="text-2xl font-bold">Applied Jobs</h2>
      {appliedJobs.length > 0 ? (
        <ul className="mt-4">
          {appliedJobs.map((job) => (
            <li key={job.id} className="mb-2 p-4 border rounded-lg shadow-sm">
              <h3 className="text-xl font-bold">{job.jobTitle}</h3>
              <p className="text-gray-700">{job.company}</p>
              <p className="text-gray-600">Status: {job.status}</p>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-gray-600">You have not applied for any jobs yet.</p>
      )}
    </div>
  );
};

export default AppliedJobs;
