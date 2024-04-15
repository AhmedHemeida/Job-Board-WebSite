
import './JobList.css'
import logo from '../photos/ahmed.jpg';
import React, { useState ,useEffect} from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Nav from '../components/nav'



const Applicants = () => {





  const token = localStorage.getItem('token');


  const queryString = window.location.search;

  const urlParams = new URLSearchParams(queryString);

  const JobId = urlParams.get('id');
    console.log(JobId);

  const [Applicants, setApplicants] = useState([]); 

  useEffect(() => {
    const headers = {
      Authorization: `${token}`,
    };

    axios
      .get(`https://job-9swc.onrender.com/api/get-applicants/${JobId}`, {
        headers: headers,
      })
      .then((response) => {
        const app = response.data;
        setApplicants(app);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, [JobId, token]); 
  

  

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

  
<Nav/>


  <div className="job-list-container">
      <div className="job-list">
        { Applicants.length === 0 ? (
         <h1 className='NoAppl'>No applicants for this job :(</h1> ) :Applicants.slice().reverse().map((usr, index) => (
          <div className="job-card" key={index}>
            <div className="job-header">
              <img src={`${usr.applicantPhoto}`} className="company-logo" alt={`Logo for ${usr.name}`} />
              <div className="company-details">
              <h2>{usr.name}</h2>
                <h3>{usr.applicantJobTitle}</h3>
              </div>
              <button className="apply" onClick={() => toggleAccordion(index)}>
                {activeIndex === index ? 'View Less' : 'View more'}
              </button>
            </div>
            {activeIndex === index && (
              <div className="user-details">
            
              
                <ul>
                     <li className='jobdes'>Phone Number: {usr.phone}</li>
                     <li className='jobdes'>Email: {usr.email}</li>
                     <li className='jobdes'>
                         <a href={usr.Resume} target="_blank" rel="noopener noreferrer">
                             Resume Link
                          </a>
                    </li>         
                          
                 </ul>

              
              
               
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  
    </>

  );
};

export default Applicants;
