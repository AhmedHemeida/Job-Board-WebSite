import React, { useState } from 'react';
import './addjob.css';
import Nav from '../components/nav';
import { useNavigate } from 'react-router-dom';
import API from '../APis/Api';
import { io } from 'socket.io-client';

function Addjob() {
  const navigate = useNavigate();

  const AddJob = (datauser) => {
    let data = {
      nameOfJob: datauser.nameOfJob,
      Disc: datauser.Disc,
      loc: datauser.loc
    };

    API
      .AddJob(data)
      .then((response) => {
        if (response.status === 201) {
          // ✅ فتح socket مؤقت فقط عشان تبعت الـ event
          const socket = io("http://localhost:5000", {
            transports: ["websocket"]
          });

          socket.emit('new-job', data);

    
       

          navigate(`/postedjobs`);
        } else {
          console.log("error happen");
        }
      })
      .catch((error) => {
        console.log("Error occurs", error);
      });
  };

  const [formData, setFormData] = useState({
    nameOfJob: '',
    Disc: '',
    loc: ''
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
    AddJob(formData);
  };

  return (
    <>
      <Nav />
      <div className="centered-container">
        <div className="rounded-border">
          <h2 className="form-title">Add a Job</h2>
          <p className="par">Post your open positions and hire fast the best talent.</p>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label className="label">Job Title</label>
              <input
                type="text"
                name="nameOfJob"
                className="input1"
                value={formData.nameOfJob}
                onChange={handleInputChange}
              />
            </div>
            <div className="form-group">
              <label className="label">Location</label>
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
