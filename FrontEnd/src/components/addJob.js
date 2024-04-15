import React, { useState } from 'react';
import './addjob.css'; // Import the CSS file\
import Nav from '../components/nav'
import { useNavigate  } from 'react-router-dom';
import API from '../APis/Api'

function Addjob() {

  let navigate = useNavigate();



  let AddJob = (datauser) => {
    let data = {
      nameOfJob:datauser.nameOfJob , 
      Disc : datauser.Disc ,
      loc  : datauser.loc
  
    }

    API
    .AddJob(data)
    .then( (response) => {
  


      if(response.status===201){
        navigate(`/postedjobs`)

      }
   
    else{
      console.log("error happen")

    }
    })
    .catch((error) => {
      console.log("Error occures", error);
    });

  };

  const [formData, setFormData] = useState({
    nameOfJob:'' , 
    Disc : '' ,
    loc  :''
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
 
    console.log(localStorage.getItem('token'))
    AddJob(formData) ;
    
  };


  
    return (
        <>
        <Nav/>
      <div className="centered-container">
        <div className="rounded-border">
          <h2 className="form-title">Add a Job</h2>
          <p className="par">Post your open positions and hire fast the best talent.</p>
          <form onSubmit={handleSubmit}>

            <div className="form-group">
              <label  className="label">Job Title</label>
              <input
                type="text"
                name="nameOfJob"
                className="input1"
                
                value={formData.nameOfJob}
                onChange={handleInputChange}
                />
            </div>
            <div className="form-group">
              <label  className="label">Location </label>
              <input
                type="text"
                name="loc"
                className="input2"
                
                value={formData.loc}
                onChange={handleInputChange}
              />
            </div>
            <div className="form-group3">
              <label htmlFor="job3" className="labe3">Description</label>
              <input
                type="text"
                name="Disc"
                className="input3"
              
                value={formData.Disc}
                onChange={handleInputChange}
              />
            </div>
            <div className="centered-submit-btn">
              <button type="submit" className="submit-btn">
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
      </>
    );
  }
  
  export default Addjob;