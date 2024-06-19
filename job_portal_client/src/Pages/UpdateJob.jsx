import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useParams, useNavigate } from 'react-router-dom';
import CreatableSelect from 'react-select/creatable';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './CreateJob.css';

const UpdateJob = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [jobData, setJobData] = useState(null);
  const [selectedOption, setSelectedOption] = useState([]);
  const { register, handleSubmit, reset, formState: { errors } } = useForm();

  useEffect(() => {
    const fetchJobData = async () => {
      try {
        const response = await fetch(`http://localhost:3000/all-jobs/${id}`);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setJobData(data);
        setSelectedOption(data.skills.map(skill => ({ value: skill, label: skill })));
        reset(data);
      } catch (error) {
        console.error('Error fetching job data:', error);
      }
    };

    fetchJobData();
  }, [id, reset]);

  const onSubmit = async (data) => {
    data.skills = selectedOption.map(option => option.value);
    try {
      const response = await fetch(`http://localhost:3000/update-job/${id}`, {
        method: "PATCH",
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const result = await response.json();
      if (result.message === "Job updated successfully") {
        // Display success message
        toast.success("Job updated successfully");
        // Redirect to myJobs route after a short delay
        setTimeout(() => {
          navigate(`/my`);
        }, 2000); // 2000 milliseconds delay
      } else {
        toast.error("Failed to update job. Please try again.");
      }
    } catch (error) {
      console.error('Error updating job:', error);
      toast.error("Failed to update job. Please try again.");
    }
  };

  const options = [
    { value: "JavaScript", label: "JavaScript" },
    { value: "Python", label: "Python" },
    { value: "Java", label: "Java" },
    { value: "C++", label: "C++" },
    { value: "C#", label: "C#" },
    { value: "Ruby", label: "Ruby" },
    { value: "PHP", label: "PHP" },
    { value: "Swift", label: "Swift" },
    { value: "Kotlin", label: "Kotlin" },
    { value: "Go", label: "Go" },
    { value: "Rust", label: "Rust" },
    { value: "TypeScript", label: "TypeScript" },
    { value: "R", label: "R" },
    { value: "MATLAB", label: "MATLAB" },
    { value: "COBOL", label: "COBOL" },
    { value: "Shell", label: "Shell" },
    { value: "SQL", label: "SQL" },
    { value: "PowerShell", label: "PowerShell" },
    { value: "PL/SQL", label: "PL/SQL" },
  ];

  return (
    <div className="container">
      <ToastContainer />
      <div className="bg-black">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          {/* Job Title */}
          <div className="text-white flex-row">
            <div className="half-width">
              <label className="form-label">Job Title</label>
              <input
                type="text"
                defaultValue={jobData ? jobData.jobTitle : ""}
                {...register("jobTitle")}
                className="form-input"
              />
            </div>
            {/* Company Name */}
            <div className="half-width">
              <label className="form-label">Company Name</label>
              <input
                type="text"
                defaultValue={jobData ? jobData.companyName : ""}
                {...register("companyName")}
                className="form-input"
              />
            </div>
          </div>
          {/* Minimum Salary */}
          <div className="text-white flex-row">
            <div className="half-width">
              <label className="form-label">Minimum Salary</label>
              <input
                type="text"
                defaultValue={jobData ? jobData.minPrice : ""}
                placeholder="$20k"
                {...register("minPrice")}
                className="form-input"
              />
            </div>
            {/* Maximum Salary */}
            <div className="half-width">
              <label className="form-label">Maximum Salary</label>
              <input
                type="text"
                defaultValue
                ={jobData ? jobData.maxPrice : ""}
                placeholder="$120k"
                {...register("maxPrice")}
                className="form-input"
              />
            </div>
          </div>
          {/* Salary Type */}
          <div className="text-white flex-row">
            <div className="half-width">
              <label className="form-label">Salary Type</label>
              <select
                defaultValue={jobData ? jobData.salaryType : ""}
                {...register("salaryType")}
                className="form-select"
              >
                <option value="">Choose your salary</option>
                <option value="Hourly">Hourly</option>
                <option value="Monthly">Monthly</option>
                <option value="Yearly">Yearly</option>
              </select>
            </div>
            {/* Job Location */}
            <div className="half-width">
              <label className="form-label">Job Location</label>
              <input
                type="text"
                defaultValue={jobData ? jobData.jobLocation : ""}
                placeholder="Ex: India"
                {...register("jobLocation")}
                className="form-input"
              />
            </div>
          </div>
          {/* Job Posting Date */}
          <div className="text-white flex-row">
            <div className="half-width">
              <label className="form-label">Job Posting Date</label>
              <input
                type="date"
                defaultValue={jobData ? jobData.postingDate : ""}
                placeholder="Ex: 2023-11-11"
                {...register("postingDate")}
                className="form-input"
              />
            </div>
            {/* Experience Level */}
            <div className="half-width">
              <label className="form-label">Experience Level</label>
              <select
                defaultValue={jobData ? jobData.experiencelevel : ""}
                {...register("experiencelevel")}
                className="form-select"
              >
                <option value="">Choose your experience</option>
                <option value="No Experience">No experience</option>
                <option value="Internship">Internship</option>
                <option value="Work Remotely">Work Remotely</option>
              </select>
            </div>
          </div>
          {/* Required Skills Set */}
          <div>
            <label className="text-white form-label">Required Skills Set</label>
            <CreatableSelect
              defaultValue={selectedOption}
              onChange={setSelectedOption}
              options={options}
              isMulti
              className="form-input py-4"
            />
          </div>
          {/* Company Logo */}
          <div className="text-white flex-row">
            <div className="half-width">
              <label className="form-label">Company Logo</label>
              <input
                type="url"
                defaultValue={jobData ? jobData.companyLogo : ""}
                placeholder="Paste your company logo URL here"
                {...register("companyLogo")}
                className="form-input"
              />
            </div>
            {/* Employment Type */}
            <div className="half-width">
              <label className="form-label">Employment Type</label>
              <select
                defaultValue={jobData ? jobData.employmentType : ""}
                {...register("employmentType")}
                className="form-select"
              >
                <option value="">Choose your Employment Type</option>
                <option value="Full-time">Full-time</option>
                <option value="Part-time">Part-time</option>
                <option value="Internship">Internship</option>
              </select>
            </div>
          </div>
          {/* Job Description */}
          <div className="text-white w-full">
            <label className="form-label">Job Description</label>
            <textarea
              className="textarea"
              rows={6}
              defaultValue={jobData ? jobData.description : ""}
              placeholder="Job description"
              {...register("description")}
            />
          </div>
          {/* Job Posted By */}
          <div className="w-full">
            <label className="form-label">Job Posted By</label>
            <input
              type="email"
              placeholder="Your email"
              {...register("postedBy")}
              className="form-input"
            />
          </div>
          {/* Submit Button */}
          <input
            type="submit"
            className="button"
            value="Update Job"
          />
        </form>
      </div>
    </div>
  );
};

export default UpdateJob;
