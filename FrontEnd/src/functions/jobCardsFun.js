import React from 'react'; // Make sure to import React
import { useNavigate } from 'react-router-dom';

export function JobCards(jobArray, activeIndex, toggleAccordion) {
  const navigate = useNavigate();

  const goApply = (id) => {
    navigate(`/applyjob?id=${id}`);
  };

  return jobArray.map((job, index) => (
    <div className="job-card" key={index}>
      <div className="job-header">
        <img src={job.CompanyPhoto} className="company-logo" alt={`Logo for ${job.nameOfCompany}`} />
        <div className="company-details">
          <h3>{job.nameOfCompany}</h3>
          <h1>{job.nameOfJob}</h1>
          <p>{job.Location}</p>
        </div>
        <button className="apply" onClick={() => toggleAccordion(index)}>
          {activeIndex === index ? 'View Less' : 'View more'}
        </button>
      </div>
      {activeIndex === index && (
        <div className="job-details">
          <p className='jobdes'>{job.Disc}</p>
          <button className='applybutton' onClick={() => goApply(job._id)}>Apply</button>
        </div>
      )}
    </div>
  ));
}
