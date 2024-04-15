// src/components/JobList.js

import './JobList.css'; // Import the CSS file for job list styles
import logo from '../photos/orange.jpg';
import CanNav from '../components/CanNav' ;
import React, { useState ,useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '@mui/material/Icon';
import axios from 'axios';
import {JobCards}  from '../functions/jobCardsFun'

function searchByNameOfJob(array, searchTerm) {
  searchTerm = searchTerm.toLowerCase();

  return array.filter((item) => {
    const nameOfJob = item.nameOfJob.toLowerCase();
    return nameOfJob.includes(searchTerm);
  });
}

const LatestJobs = () => {

  
  const token = localStorage.getItem('token');

    const navigate = useNavigate(); 


  const [Job, setJob] = useState([]); 
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [activeIndex, setActiveIndex] = useState(null);






  useEffect(() => {
    const headers = {
      Authorization: `${token}`,
    };

    axios
      .get("https://job-9swc.onrender.com/api/get-alljobs", {
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






        const toggleAccordion = (index) => {
          if (activeIndex === index) {
            setActiveIndex(null);
          } else {
            setActiveIndex(index);
          }
        };


        const handleInputChange = (event) => {
          const term = event.target.value;
          setSearchTerm(term);
      
          const results = searchByNameOfJob(Job, term);
          setSearchResults(results);
        };



  return (



    <>

    <CanNav/>

    <div className="search-container">
   
    <input
      type="text"
      placeholder="Search Jobs..."
      className="search-input"
      value={searchTerm}
      onChange={handleInputChange}
     
    />


   
  </div>


  <div className="job-list-container">
      <div className="job-list">
     

      {searchTerm ? (
        JobCards(searchResults, activeIndex, toggleAccordion)
          ) : (
            JobCards(Job.slice().reverse(), activeIndex, toggleAccordion)
          )}
      </div>
    </div>
  
    </>
  );
};

export default LatestJobs;
