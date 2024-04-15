import React, { useState } from "react";
import "./addjob.css"; // Import the CSS file\
import AuthNav from "../components/AuthNav";
import API from '../APis/Api'
import { useNavigate  } from 'react-router-dom';


function Addjob() {



  let navigate = useNavigate();

  const [data, setData] = useState([]);


  let Login = (datauser) => {
    let data = {
      email:datauser.email , 
      password : datauser.password ,
  
    }

    API
    .Login(data)
    .then( (response) => {
   
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('username', response.data.username);



      if(response.data.IsEmployer===false){
        navigate(`/latestjobs`)

      }
   
    else{
      navigate('/postedjobs')

    }
    })
    .catch((error) => {
      console.log("Error occures", error);
    });

  };

  const [formData, setFormData] = useState({
    email: '',
    password: '',
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
 

    Login(formData) ;
    
  };




  return (
    <>
      <AuthNav />
      <div className="centered-container">
        <div className="rounded-border">
          <h2 className="form-title">Sign In </h2>
          <p className="par">
            Welcome Back sign in now to post or search a job
          </p>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label  className="label">
                Your Email
              </label>
              <input
                type="text"
                name="email"
                className="input1"
                value={formData.email}
                 onChange={handleInputChange}
              />
            </div>

            <div className="form-group">
              <label  className="label">
                Password
              </label>
              <input
                type="password"
              
                name="password"
                className="input1"
                value={formData.password}
                onChange={handleInputChange}
              />
            </div>

            

            <p className="p2">
              Don't have an email, <a href="/signup">sign up now</a>.
            </p>

            <div className="centered-submit-btn">
              <button type="submit" className="submit-btn">
                Sign In
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default Addjob;
