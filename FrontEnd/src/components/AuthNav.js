import React from 'react';
import { useNavigate } from 'react-router-dom';
import './nav.css';
import logo from '../photos/logoo.jpg';

function Nav() {

  const navigate = useNavigate(); // Call useNavigate as a function to get the navigation function

  const goHome = () => {
    navigate('/');
  };

  const goJobs = () => {
    navigate('/postedjobs');
  };

  const Login = () => {
    navigate('/signin');
  };


  return (
    <div className="nav">
      <div className="logo">
        <h2 className="H22"> Welcome..!</h2>
      </div>
      <nav>
        <ul className="nav-list">
          <li className="nav-item" onClick={goHome}>
            Home
          </li>
         
          <li className="nav-item red-button" onClick={Login}>Login</li>
        </ul>
      </nav>
    </div>
  );
}

export default Nav;
