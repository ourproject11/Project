import React from 'react';
import Inputfield from '../components/InputField';
import './JobPostingData.css'; // Ensure this path is correct based on your project structure

const JobPostingData = ({ handleChange }) => {
  const now = new Date();

  const twentyFourHoursAgo = new Date(now - 24 * 60 * 60 * 1000);
  const SevenDaysAgo = new Date(now - 7 * 24 * 60 * 60 * 1000);
  const ThirtyDaysAgo = new Date(now - 30 * 24 * 60 * 60 * 1000);

  // Convert date to string
  const twentyFourHoursAgoDate = twentyFourHoursAgo.toISOString().slice(0, 10);
  const SevenDaysAgoDate = SevenDaysAgo.toISOString().slice(0, 10);
  const ThirtyDaysAgoDate = ThirtyDaysAgo.toISOString().slice(0, 10);

  return (
    <div>
      <h4 className='posting-title'>Date of Posting</h4>
      <div>
        <label className='side-label-container'>
          <input type="radio" name="test" id="test" value="" onChange={handleChange} />
          <span className="checkmark"></span>All time
        </label>

        <Inputfield handleChange={handleChange} value={twentyFourHoursAgoDate} title="Last 24 hours" name="test" />
        <Inputfield handleChange={handleChange} value={SevenDaysAgoDate} title="Last 7 days" name="test" />
        <Inputfield handleChange={handleChange} value={ThirtyDaysAgoDate} title="Last month" name="test" />
      </div>
    </div>
  );
};

export default JobPostingData;
