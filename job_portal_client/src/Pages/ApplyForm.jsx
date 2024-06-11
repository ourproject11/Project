import React, { useState } from 'react';

const ApplyForm = ({ jobData, setShowForm, onApplySuccess }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    resume: '',
    coverLetter: ''
  });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Logic to submit the form data
    // For demonstration purposes, let's assume the submission was successful
    // You can replace this with your actual form submission logic

    // Simulate a delay of 2 seconds to mimic form submission
    await new Promise((resolve) => setTimeout(resolve, 2000));

    // After successful submission, update the UI and show the success message
    setSubmitted(true);
    onApplySuccess();
  };

  return (
    <div className="bg-white shadow-lg rounded-lg overflow-hidden">
      <div className="p-6">
        <h3 className="text-2xl font-bold mb-4">Apply for {jobData.jobTitle}</h3>
        {!submitted ? (
          <form onSubmit={handleSubmit}>
            {/* Form fields */}
            <div className="mb-4">
              <label className="block text-gray-700 font-bold mb-2">Name</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded-lg shadow-sm focus:outline-none focus:border-blue-500"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 font-bold mb-2">Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded-lg shadow-sm focus:outline-none focus:border-blue-500"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 font-bold mb-2">Phone</label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded-lg shadow-sm focus:outline-none focus:border-blue-500"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 font-bold mb-2">Resume</label>
              <input
                type="file"
                name="resume"
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded-lg shadow-sm focus:outline-none focus:border-blue-500"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 font-bold mb-2">Cover Letter</label>
              <textarea
                name="coverLetter"
                value={formData.coverLetter}
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded-lg shadow-sm focus:outline-none focus:border-blue-500"
                rows="4"
              />
            </div>
            <div className="text-center">
              <button
                type="submit"
                className="bg-purple-600 text-white py-3 px-8 rounded-full text-lg font-bold hover:bg-purple-700 transition duration-300"
              >
                Submit Application
              </button>
              <button
                onClick={() => setShowForm(false)}
                className="ml-4 text-gray-600 hover:text-gray-800 focus:outline-none"
              >
                Cancel
              </button>
            </div>
          </form>
        ) : (
          <p className="text-green-600 font-bold">Application submitted successfully!</p>
        )}
      </div>
    </div>
  );
};

export default ApplyForm;
