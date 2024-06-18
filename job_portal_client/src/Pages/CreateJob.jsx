import { useForm } from "react-hook-form";
import CreatableSelect from 'react-select/creatable';
import { useState } from "react";

const CreateJob = () => {
  const [selectedOption, setSelectedOption] = useState(null);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    data.skills = selectedOption.map(option => option.value);
    try {
      const response = await fetch("http://localhost:3000/post-job", {
        method: "POST",
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
      if (result.acknowledged) {
        alert("Your job was posted successfully!!");
        reset();
        setSelectedOption([]);
      }
    } catch (error) {
      console.error('Error posting job:', error);
      alert("There was an error posting the job. Please try again.");
      reset();
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
    <div className="bg-darkblue min-h-screen flex items-center justify-center">
      <div className="bg-black p-8 rounded-lg shadow-lg w-full max-w-3xl">
        <h2 className="text-3xl font-semibold text-center text-white mb-8">Create a Job</h2>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {/* Job Title and Company Name */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-white mb-1">Job Title</label>
              <input
                type="text"
                {...register("jobTitle", { required: true })}
                className="form-input border border-gray-300 focus:border-blue-500 rounded-md px-3 py-2"
                placeholder="Enter job title"
              />
              {errors.jobTitle && <span className="text-red-500 text-xs">This field is required</span>}
            </div>
            <div>
              <label className="block text-sm font-medium text-white mb-1">Company Name</label>
              <input
                type="text"
                {...register("companyName", { required: true })}
                className="form-input border border-gray-300 focus:border-blue-500 rounded-md px-3 py-2"
                placeholder="Enter company name"
              />
              {errors.companyName && <span className="text-red-500 text-xs">This field is required</span>}
            </div>
          </div>

          {/* Salary and Salary Type */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-white mb-1">Minimum Salary</label>
              <input
                type="text"
                {...register("minPrice")}
                className="form-input border border-gray-300 focus:border-blue-500 rounded-md px-3 py-2"
                placeholder="Enter minimum salary"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-white mb-1">Maximum Salary</label>
              <input
                type="text"
                {...register("maxPrice")}
                className="form-input border border-gray-300 focus:border-blue-500 rounded-md px-3 py-2"
                placeholder="Enter maximum salary"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-white mb-1">Salary Type</label>
              <select {...register("salaryType")} className="form-select border border-gray-300 focus:border-blue-500 rounded-md px-3 py-2">
                <option value="">Choose salary type</option>
                <option value="Hourly">Hourly</option>
                <option value="Monthly">Monthly</option>
                <option value="Yearly">Yearly</option>
              </select>
            </div>
          </div>

          {/* Job Location and Posting Date */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-white mb-1">Job Location</label>
              <input
                type="text"
                {...register("jobLocation")}
                className="form-input border border-gray-300 focus:border-blue-500 rounded-md px-3 py-2"
                placeholder="Enter job location"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-white mb-1">Posting Date</label>
              <input
                type="date"
                {...register("postingDate")}
                className="form-input border border-gray-300 focus:border-blue-500 rounded-md px-3 py-2"
              />
            </div>
          </div>

          {/* Experience Level and Skills Set */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-white mb-1">Experience Level</label>
              <select {...register("experiencelevel")} className="form-select border border-gray-300 focus:border-blue-500 rounded-md px-3 py-2">
                <option value="">Choose experience level</option>
                <option value="No Experience">No experience</option>
                <option value="Internship">Internship</option>
                <option value="Work Remotely">Work Remotely</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-white mb-1">Required Skills Set</label>
              <CreatableSelect
                defaultValue={selectedOption}
                onChange={setSelectedOption}
                options={options}
                isMulti
                className="form-input py-2"
                classNamePrefix="select"
              />
            </div>
          </div>

          {/* Company Logo and Employment Type */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-white mb-1">Company Logo URL</label>
              <input
                type="url"
                {...register("companyLogo")}
                className="form-input border border-gray-300 focus:border-blue-500 rounded-md px-3 py-2"
                placeholder="Paste company logo URL"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-white mb-1">Employment Type</label>
              <select {...register("employmentType")} className="form-select border border-gray-300 focus:border-blue-500 rounded-md px-3 py-2">
                <option value="">Choose employment type</option>
                <option value="Full-time">Full-time</option>
                <option value="Part-time">Part-time</option>
                <option value="Internship">Internship</option>
              </select>
            </div>
          </div>

          {/* Job Description and Posted By */}
          <div>
            <label className="block text-sm font-medium text-white mb-1">Job Description</label>
            <textarea
              className="form-textarea w-full px-3 py-2 bg-white text-white border border-gray-300 rounded-lg focus:outline-none"
              rows={6}
              {...register("description")}
              placeholder="Enter job description"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-white mb-1">Job Posted By</label>
            <input
              type="email"
              {...register("postedBy", { required: true })}
              className="form-input border border-gray-300 focus:border-blue-500 rounded-md px-3 py-2"
              placeholder="Enter your email"
            />
            {errors.postedBy && <span className="text-red-500 text-xs">This field is required</span>}
          </div>

          {/* Submit Button */}
          <div className="text-center">
            <button
              type="submit"
              className="bg-cherry hover:bg-blue-300 text-black font-semibold px-6 py-3 rounded-md transition duration-200"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateJob;
