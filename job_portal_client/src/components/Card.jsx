import React from 'react';
import { Link } from 'react-router-dom';
import { FiCalendar, FiClock, FiDollarSign, FiMapPin } from "react-icons/fi";
import './Card.css';

const Card = ({ data, searchCompanyName }) => {
  const { _id, companyName, jobTitle, companyLogo, minPrice, maxPrice, salaryType, jobLocation, employmentType, postingDate, description } = data;

  // Check if searchCompanyName exists and filter by company name
  if (searchCompanyName && !companyName.toLowerCase().includes(searchCompanyName.toLowerCase())) {
    return null; // Return null if company name doesn't match search
  }

  return (
    <section className='card'>
      <Link to={`/job/${_id}`} className='card-link'>
        <img src={companyLogo} alt="" className='card-logo' />
        <div>
          <h4 className='card-company-name'>{companyName}</h4>
          <h3 className='card-job-title'>{jobTitle}</h3>
          <div className='card-details'>
            <span className='card-detail'><FiMapPin />{jobLocation}</span>
            <span className='card-detail'><FiClock />{employmentType}</span>
            <span className='card-detail'><FiDollarSign />{minPrice}-{maxPrice}k</span>
            <span className='card-detail'><FiCalendar />{postingDate}</span>
          </div>
          <p className='card-description'>{description}</p>
        </div>
      </Link>
    </section>
  );
};

export default Card;
