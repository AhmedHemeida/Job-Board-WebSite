import React from 'react';
import { useNavigate } from 'react-router-dom';
import './nav.css';
import logo from '../photos/logoo.jpg';

function Nav() {

  const navigate = useNavigate();

  const username = localStorage.getItem('username');

  const goHome = () => {
    navigate('/');
  };

  const goJobs = () => {
    navigate('/postedjobs');
  };

  const addJob = () => {
    navigate('/addjob');
  };


  return (
    <div className="nav">
    
      <nav>
        <ul className="nav-list">

        <li><i class="material-icons">person</i></li>
           <li className='prof2'>{username}</li>
          <li className="nav-item" onClick={goJobs}>Posted Job</li>
          <li className="nav-item red-button" onClick={addJob}>Add a Job</li>
        </ul>
      </nav>
    </div>
  );
}

export default Nav;
