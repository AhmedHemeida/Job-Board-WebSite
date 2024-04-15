import React, { useState } from 'react';
import './addjob.css'; // Import the CSS file\
import CanNav from '../components/CanNav' ;
import { useNavigate  } from 'react-router-dom';
import API from '../APis/Api'
import { useParams } from 'react-router-dom';

function Applyjob() {
   

  const queryString = window.location.search;

  const urlParams = new URLSearchParams(queryString);

  const id = urlParams.get('id');


  let navigate = useNavigate();



  let ApplyJob = (datauser) => {
    let data = {
      file:datauser.file , 
      name : datauser.name ,
      phone  : datauser.phone ,
      email : datauser.email ,
      jobId : datauser.jobId ,

  
    }

    API
    .ApplyJob(data)
    .then( (response) => {
  


      if(response.status===201){
        navigate(`/applications`)

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
    file:null, 
    name : '' ,
    phone  :'' ,
    email : '' ,
    jobId : `${id}`,
  });


  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    setFormData({
      ...formData,
      file: selectedFile,
    });
  };


  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };


  const handleSubmit = (e) => {
    e.preventDefault();
 
    console.log(formData.jobId)
    ApplyJob(formData) ;
    
  };



  
    return (
        <>
        <CanNav/>
      <div className="centered-container">
        <div className="rounded-border">
          <h2 className="form-title">Apply Job</h2>
          <p className="par">apply your open positions and wait our respond.</p>


          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label  className="label">Name                             </label>
              <input
                type="text"
                name="name"
                className="input1"
                
                value={formData.name}
                onChange={handleInputChange}
              />
            </div>
            <div className="form-group">
              <label  className="label">Phone</label>
              <input
                type="text"
                name="phone"
                className="input1"
                
                value={formData.phone}
                onChange={handleInputChange}
              />
            </div>
            <div className="form-group">
              <label  className="label">Email                             </label>
              <input
                type="text"
                name="email"
                className="input1"
                
                value={formData.email}
                onChange={handleInputChange}
              />
            </div>
          
            <div className="form-group">
            <label  className="label">Resume   </label>
            <input
              type="file"
              name="resume"
              accept=".pdf,.doc,.docx"
              className="resumeinput"
              onChange={handleFileChange}
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
  
  export default Applyjob;