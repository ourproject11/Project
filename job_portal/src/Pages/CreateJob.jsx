import { useForm } from "react-hook-form";
import './CreateJob.css';
import CreatableSelect from 'react-select/creatable';
import { useState } from "react";

const CreateJob = () => {
  const [selectedOption, setSelectedOption] = useState(null);
  const {
    register,
    handleSubmit,reset,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    data.skills = selectedOption.map(option => option.value);
    try {
      const response = await fetch("http://localhost:3000/post-job", { // Changed https to http
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
        setSelectedOption([]); // Clear selected options after successful submission
      }
    } catch (error) {
      console.error('Error posting job:', error);
      alert("There was an error posting the job. Please try again.");
      reset();
    }
  };
  
  // const onSubmit = (data) => {
  //   data.skills = selectedOption;
  //   // console.log(data);
  //   fetch("https://localhost:3000/post-job",{
  //     method:"POST",
  //     headers:{'content-type': 'application/json'},
  //     body: JSON.stringify(data)
  //   })
  //   .then((res)=>res.json())
  //   .then((result)=>{
  //     console.log(result);
  //     // if(result.acknowledged==true){
  //     //   alert("Your job Posted successfully!!")
  //     // }
  //     // reset()
  //   });
  // };

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
      <div className="bg-light-gray">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          {/* 1st row */}
          <div className="flex-row">
            <div className="half-width">
              <label className="form-label">Job Title</label>
              <input
                type="text"
                defaultValue={"Web Developer"}
                {...register("jobTitle")}
                className="form-input"
              />
            </div>
            <div className="half-width">
              <label className="form-label">Company Name</label>
              <input
                type="text"
                placeholder="Ex: Microsoft"
                {...register("companyName")}
                className="form-input"
              />
            </div>
          </div>

          {/* 2nd row */}
          <div className="flex-row">
            <div className="half-width">
              <label className="form-label">Minimum Salary</label>
              <input
                type="text"
                placeholder="$20k"
                {...register("minPrice")}
                className="form-input"
              />
            </div>
            <div className="half-width">
              <label className="form-label">Maximum Salary</label>
              <input
                type="text"
                placeholder="$120k"
                {...register("maxPrice")}
                className="form-input"
              />
            </div>
          </div>

          {/* 3rd row */}
          <div className="flex-row">
            <div className="half-width">
              <label className="form-label">Salary Type</label>
              <select {...register("salaryType")} className="form-select">
                <option value="">Choose your salary</option>
                <option value="Hourly">Hourly</option>
                <option value="Monthly">Monthly</option>
                <option value="Yearly">Yearly</option>
              </select>
            </div>
            <div className="half-width">
              <label className="form-label">Job Location</label>
              <input
                type="text"
                placeholder="Ex: India"
                {...register("jobLocation")}
                className="form-input"
              />
            </div>
          </div>

          {/* 4th row */}
          <div className="flex-row">
            <div className="half-width">
              <label className="form-label">Job Posting Date</label>
              <input
                type="date"
                placeholder="Ex: 2023-11-11"
                {...register("postingDate")}
                className="form-input"
              />
            </div>
            <div className="half-width">
              <label className="form-label">Experience Level</label>
              <select {...register("experiencelevel")} className="form-select">
                <option value="">Choose your experience</option>
                <option value="No Experience">No experience</option>
                <option value="Internship">Internship</option>
                <option value="Work Remotely">Work Remotely</option>
              </select>
            </div>
          </div>

          {/* 5th row */}
          <div>
            <label className="form-label">Required Skills Set</label>
            <CreatableSelect
              defaultValue={selectedOption}
              onChange={setSelectedOption}
              options={options}
              isMulti
              className="form-input py-4"
            />
          </div>

          {/* 6th row */}
          <div className="flex-row">
            <div className="half-width">
              <label className="form-label">Company Logo</label>
              <input
                type="url"
                placeholder="Paste your company logo URL here"
                {...register("companyLogo")}
                className="form-input"
              />
            </div>
            <div className="half-width">
              <label className="form-label">Employment Type</label>
              <select {...register("employmentType")} className="form-select">
                <option value="">Choose your Employment Type</option>
                <option value="Full-time">Full-time</option>
                <option value="Part-time">Part-time</option>
                <option value="Internship">Internship</option>
              </select>
            </div>
          </div>

          {/* 7th row */}
          <div className="w-full">
            <label className="form-label">Job Description</label>
            <textarea
              className="textarea"
              rows={6}
              defaultValue={
                "Lorem ipsum dolor sit amet consectetur adipisicing elit. A, eum fugit reprehenderit sit similique accusamus?"
              }
              placeholder="Job description"
              {...register("description")}
            />
          </div>

          {/* last row */}
          <div className="w-full">
            <label className="form-label">Job Posted By</label>
            <input
              type="email"
              placeholder="Your email"
              {...register("postedBy")}
              className="form-input"
            />
          </div>

          <input
            type="submit"
            className="button"
          />
        </form>
      </div>
    </div>
  );
};

export default CreateJob;
