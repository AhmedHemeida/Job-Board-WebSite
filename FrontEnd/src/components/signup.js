import React, { useState } from 'react';
import './addjob.css'; // Import the CSS file\
import AuthNav from '../components/AuthNav'
import API from '../APis/Api'
import { useNavigate  } from 'react-router-dom';

function Addjob() {

  let navigate = useNavigate();


  let Register = (datauser) => {

    let data = {

      username  : datauser.username ,
      email     : datauser.email , 
      password  : datauser.password ,
      JobTitle  : datauser.JobTitle ,
      IsEmployer: datauser.IsEmployer
  
    }

    API
    .Register(data)
    .then((response) => {
   
      console.log(response);
      if(response.status===201){
        navigate(`/signin`)

      }
   
  
    })
    .catch((error) => {

      console.log("Error occures", error);
    });

  };

  const [formData, setFormData] = useState({
    JobTitle  : '' ,
    username  : '' ,
    email     : '' ,
    password  : '' ,
  
    IsEmployer: true

  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    Register(formData) ;

  
    
  };


  
    return (
        <>
      
      <AuthNav/>

      <div className="centered-container">
        <div className="rounded-border">
          <h2 className="form-title">Sign Up </h2>
          <p className="par">Sign up Now to view current positions.</p>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label  className="label">Username </label>
              <input
                type="text"
                name="username"
                className="input1"
                
                value={formData.username}
                onChange={handleInputChange}
              />
            </div>
            <div className="form-group">
              <label  className="label"> Your Email</label>
              <input
                type="text"
                name="email"
                className="input1"
                
                value={formData.email}
                onChange={handleInputChange}
              />
            </div>
            

            <div className="form-group">
              <label className="label">Password</label>
              <input
                type="password"
                name="password"
                className="input1"
                
                value={formData.password}
                onChange={handleInputChange}
              />
            </div>
            

            <div className="form-group">
              <label  className="label">Job Title </label>
              <input
                type="text"
                name="JobTitle"
                className="input1"
                
                value={formData.JobTitle}
                onChange={handleInputChange}
              />
            </div>
                <div className="radio-container">
              <label>
                <input
                  type="radio"
                  className="radio-input1"
                  name="IsEmployer"
                  value={true}
                  onChange={handleInputChange}
                />
                Employer
              </label>
          
              <label>
                <input
                  type="radio"
                  className="radio-input2"
                  name="IsEmployer"
                  value={false}
                  onChange={handleInputChange}
                  
                />
                Candidate 
              </label>
            </div>


            <div className="centered-submit-btn">
              <button type="submit" className="submit-btn">
                Sign up
              </button>
            </div>
          </form>
        </div>
      </div>
      </>
    );
  }
  
  export default Addjob;