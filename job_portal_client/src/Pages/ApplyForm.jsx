import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { collection, addDoc } from 'firebase/firestore';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage'; // Import Firebase Storage
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useAuth } from '../context/AuthContext';

const ApplyForm = ({ jobData, setShowForm }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    resume: null,
    coverLetter: '',
    whyHireYou: '',
    currentAddress: '',
    localAddress: '',
    experience: ''
  });
  const [submitted, setSubmitted] = useState(false);
  const navigate = useNavigate();
  const { currentUser } = useAuth();

  const handleChange = (e) => {
    const { name, value, type, files } = e.target;
    if (type === 'file') {
      setFormData({ ...formData, [name]: files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (currentUser) {
      try {
        // Initialize Firebase Storage
        const storage = getStorage();
        
        // Upload resume to Firebase Storage
        const resumeRef = ref(storage, `resumes/${formData.resume.name}`);
        await uploadBytes(resumeRef, formData.resume);
        const resumeURL = await getDownloadURL(resumeRef);

        const newApplication = {
          ...formData,
          resume: resumeURL,
          userId: currentUser.uid,
          jobId: jobData.id,
          jobTitle: jobData.jobTitle,
          company: jobData.companyName,
          status: 'Applied'
        };

        await addDoc(collection(db, 'appliedJobs'), newApplication);
        setSubmitted(true);
        
        // Show toast notification
        toast.success('Application submitted successfully!');
        
        // Navigate to the applied jobs page after a delay to show the toast
        setTimeout(() => {
          navigate('/applied-jobs', { state: { message: 'Application submitted successfully!', company: jobData.companyName } });
        }, 2000);
      } catch (error) {
        console.error('Error submitting application:', error);
        toast.error('Failed to submit application. Please try again.');
      }
    } else {
      console.error('No user is signed in');
      toast.error('No user is signed in.');
    }
  };

  return (
    <div className="bg-black shadow-lg rounded-lg overflow-hidden">
      <div className="p-6">
        <h3 className="text-white text-2xl font-bold mb-4">Apply for {jobData.jobTitle}</h3>
        {!submitted ? (
          <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-y-6 sm:grid-cols-2 sm:gap-x-6">
            <div className="space-y-4">
              <label className="block text-white font-bold">Name</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded-lg shadow-sm focus:outline-none focus:border-blue-500"
                required
              />

              <label className="block text-white font-bold">Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded-lg shadow-sm focus:outline-none focus:border-blue-500"
                required
              />

              <label className="block text-white font-bold">Phone</label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded-lg shadow-sm focus:outline-none focus:border-blue-500"
                required
              />
            </div>

            <div className="space-y-4">
              <label className="block text-white font-bold">Resume</label>
              <input
                type="file"
                name="resume"
                onChange={handleChange}
                className="bg-white w-full px-3 py-2 border rounded-lg shadow-sm focus:outline-none focus:border-blue-500"
                required
              />

              <label className="block text-white font-bold">Cover Letter</label>
              <textarea
                name="coverLetter"
                value={formData.coverLetter}
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded-lg shadow-sm focus:outline-none focus:border-blue-500"
                rows="4"
              />
            </div>

            <div className="sm:col-span-2 space-y-4">
              <label className="block text-white font-bold">Why should I hire you?</label>
              <textarea
                name="whyHireYou"
                value={formData.whyHireYou}
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded-lg shadow-sm focus:outline-none focus:border-blue-500"
                rows="4"
                required
              />

              <label className="block text-white font-bold">Current Address</label>
              <input
                type="text"
                name="currentAddress"
                value={formData.currentAddress}
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded-lg shadow-sm focus:outline-none focus:border-blue-500"
                required
              />

              <label className="block text-white font-bold">Local Address</label>
              <input
                type="text"
                name="localAddress"
                value={formData.localAddress}
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded-lg shadow-sm focus:outline-none focus:border-blue-500"
                required
              />

              <label className="block text-white font-bold">Experience</label>
              <textarea
                name="experience"
                value={formData.experience}
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded-lg shadow-sm focus:outline-none focus:border-blue-500"
                rows="4"
                required
              />
            </div>

            <div className="sm:col-span-2 flex justify-center space-x-4 mt-6">
              <button
                type="submit"
                className="bg-cherry text-white py-3 px-8 rounded-full text-lg font-bold hover:bg-darkred transition duration-300"
              >
                Submit Application
              </button>
              <button
                type="button"
                onClick={() => setShowForm(false)}
                className="text-white hover:text-gray-800 focus:outline-none"
              >
                Cancel
              </button>
            </div>
          </form>
        ) : (
          <p className="text-green-600 font-bold">Application submitted successfully!</p>
        )}
      </div>
      <ToastContainer />
    </div>
  );
};

export default ApplyForm;
