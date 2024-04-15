// src/components/JobList.js

import './JobList.css'; // Import the CSS file for job list styles
import logo from '../photos/logoo.jpg';
import CanNav from '../components/CanNav' ;
import React, { useState ,useEffect} from 'react';
import API from '../APis/Api'
import axios from 'axios';


const Applications = () => {


 



const token = localStorage.getItem('token');



  const [Job, setJob] = useState([]); 

  useEffect(() => {
    const headers = {
      Authorization: `${token}`,
    };

    axios
      .get("https://job-9swc.onrender.com/api/get-applications", {
        headers: headers,
      })
      .then((response) => {
        const jobss = response.data;
        setJob(jobss);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []); 
  


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

    <CanNav/>

 


  <div className="job-list-container">
      <div className="job-list">
        {Job.slice().reverse().map((job, index) => (


          <div className="job-card" key={index}>
            <div className="job-header">
              <img src={job.jobId.CompanyPhoto} className="company-logo" alt={`Logo for ${job.jobId.nameOfCompany}`} />
              <div className="company-details">
                <h3>{job.jobId.nameOfCompany}</h3>
                <h1>{job.jobId.nameOfJob}</h1>


                <p>{job.jobId.Location}</p>
              </div>
              <button className="apply" onClick={() => toggleAccordion(index)}>
                {activeIndex === index ? 'View Less' : 'View more'}
              </button>
            </div>
            {activeIndex === index && (
              <div className="job-details">
                {/* Add the additional job details here */}
                <p>{job.jobId.Disc}</p>
                {/* Add more details as needed */}
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
