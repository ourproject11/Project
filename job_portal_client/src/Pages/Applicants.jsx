// Applicants.jsx

import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { db } from '../firebase/firebase.config'; // Import Firestore instance

const Applicants = () => {
  const { jobId } = useParams();
  const [applicants, setApplicants] = useState([]);

  useEffect(() => {
    const fetchApplicants = async () => {
      try {
        const q = query(collection(db, 'applications'), where('jobId', '==', jobId));
        const querySnapshot = await getDocs(q);

        const applicantsData = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));

        setApplicants(applicantsData);
      } catch (error) {
        console.error("Error fetching applicants:", error);
      }
    };

    fetchApplicants();
  }, [jobId]);

  return (
    <div>
      <h2>Applicants for Job ID: {jobId}</h2>
      <ul>
        {applicants.map(applicant => (
          <li key={applicant.id}>
            <p>Name: {applicant.name}</p>
            <p>Email: {applicant.email}</p>
            <p>Phone: {applicant.phone}</p>
            {/* Display other applicant details as needed */}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Applicants;
