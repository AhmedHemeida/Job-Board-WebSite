import React from 'react';
import { useNavigate ,useParams} from 'react-router-dom';
import './nav.css';
import API from '../APis/Api'


function Nav() {

  const navigate = useNavigate(); 
  const username = localStorage.getItem('username');






   
  


  const applications = () => {
    navigate('/applications');
  };

  const FindJob = () => {
    navigate('/latestjobs');
  };


  return (
    <div className="nav">
    
      <nav>
        <ul className="nav-list">
        
         <li className='person'><i class="material-icons">person</i></li>
           <li className='prof2'>{username}</li>
          <li className="nav-item" onClick={applications}>Applications</li>
          <li className="nav-item red-button" onClick={FindJob}>Find Job</li>
        </ul>
       
      </nav>
    </div>
  );
}

export default Nav;
