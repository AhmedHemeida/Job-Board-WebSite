// src/components/JobList.js

import './JobList.css';
import CanNav from '../components/CanNav';
import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { JobCards } from '../functions/jobCardsFun';
import { io } from 'socket.io-client';

function searchByNameOfJob(array, searchTerm) {
  searchTerm = searchTerm.toLowerCase();
  return array.filter((item) => item.nameOfJob.toLowerCase().includes(searchTerm));
}

const LatestJobs = () => {
  const navigate = useNavigate();

  const [Job, setJob] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [activeIndex, setActiveIndex] = useState(null);
  const socketRef = useRef(null); // ✅ socket ref

  useEffect(() => {

    axios
      .get("http://localhost:5000/api/get-alljobs")
      .then((response) => {
        setJob(response.data);
            console.log("jobb ahoom",Job.nameOfCompany) ;

      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });

    // ✅ 2. setup socket once
    socketRef.current = io("http://localhost:5000", {
      transports: ["websocket"],
    });

    socketRef.current.on("connect", () => {
      console.log("✅ Socket connected");
    });

    socketRef.current.on("new-job", (newJob) => {
      console.log("📢 Received new job:", newJob);
        setJob((prevJobs) => [...prevJobs, newJob]);
    });

    return () => {
      socketRef.current.disconnect();
    };
  }, []);

  const toggleAccordion = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  const handleInputChange = (event) => {
    const term = event.target.value;
    setSearchTerm(term);
    setSearchResults(searchByNameOfJob(Job, term));
  };

  return (
    <>
      <CanNav />
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
          {searchTerm
            ? JobCards(searchResults, activeIndex, toggleAccordion)
            : JobCards(Job.slice().reverse(), activeIndex, toggleAccordion)

}
        </div>
      </div>
    </>
  );
};

export default LatestJobs;
