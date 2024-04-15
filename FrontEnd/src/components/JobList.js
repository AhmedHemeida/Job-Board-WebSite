
import './JobList.css'
import logo from '../photos/logoo.jpg';
import React, { useState ,useEffect} from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';



const Applications = () => {



  const navigate = useNavigate();


  const token = localStorage.getItem('token');



  const [Job, setJob] = useState([]); 

  useEffect(() => {
    const headers = {
      Authorization: `${token}`,
    };

    axios
      .get("https://job-9swc.onrender.com/api/get-postedjobs", {
        headers: headers,
      })
      .then((response) => {
        const jobss = response.data;
        setJob(jobss);
        console.log(jobss);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []); 
  

  const goApplicants = (id,job) => {
    navigate(`/applicants?id=${id}`);
  };

        const [activeIndex, setActiveIndex] = useState(null);

        const toggleAccordion = (index) => {
          if (activeIndex === index) {
            setActiveIndex(null);
          } else {
            setActiveIndex(index);
          }
        };

  return (


    
    <>

  


  <div className="job-list-container">
      <div className="job-list">
        {Job.slice().reverse().map((job, index) => (
          <div className="job-card" key={index}>
            <div className="job-header">
            <img src={`${job.CompanyPhoto}`} className="company-logo" alt={`Logo for ${job.nameOfCompany}`} />
              <div className="company-details">
              <h2>{job.nameOfCompany}</h2>
                <h3>{job.nameOfJob}</h3>
                <p>{job.Location}</p>
              </div>
              <button className="apply" onClick={() => toggleAccordion(index)}>
                {activeIndex === index ? 'View Less' : 'View more'}
              </button>
            </div>
            {activeIndex === index && (
              <div className="job-details">
            
              
                <p className='jobdes'>{job.Disc}</p>
                <button className='applybutton' onClick={() => goApplicants(job._id,job.CompanyPhoto)}> Applicants</button>
              
              
               
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  
    </>

  );
};

export default Applications;
