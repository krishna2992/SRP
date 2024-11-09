import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom'
import { useSelector} from 'react-redux';
import Header from '../../components/New/Header';
import './Leave.css'
import { submitLeave } from '../../actions/applications';
const LeaveApplicationForm = () => {
  const navigate = useNavigate();
  const User = useSelector((state)=> (state.authReducer)).data;
  const [formData, setFormData] = useState({
    student: User?.id, // Set student ID here
    startDate: '',
    numberOfDays: 0,
    reason: '',
    attachment: null,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    setFormData({ ...formData, attachment: e.target.files[0] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
      const formDataToSend = new FormData();
      for (const key in formData) {
        if (formData[key] !== null) { // Check if value is not null
          formDataToSend.append(key, formData[key]);
        }
      }

      const responce = await submitLeave(formDataToSend);
      if(responce.stat === 'C200')
      {
        alert('Leave application submitted successfully!'); 
        setFormData({
          student: User?.id,
          startDate: '',
          numberOfDays: 0,
          reason: '',
          attachment: null,
        });
        navigate('/student/home') 
      }
      else{
        alert('Failed to Subbmit Application');
        setFormData({
          student: User?.id,
          startDate: '',
          numberOfDays: 0,
          reason: '',
          attachment: null,
        });
      }
      
    
  };

  useEffect(()=>{
    if(!User)
    {
      navigate('/');
      return
    }
    if(User?.type !== 'student')
    {
      navigate('/');
      return
    }
  }, [])

  return (
    
    <div>
      <Header/>
      <div className="leave-container">
    
    <div className="form-container">
      <header>
        <h2>Leave Application Form</h2>
      </header>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="startDate">Start Date:</label>
          <input type="date" id="startDate" name="startDate" value={formData.startDate} onChange={handleChange} />
        </div>
        <div className="form-group">
          <label htmlFor="numberOfDays">Number of Days:</label>
          <input type="number" id="numberOfDays" name="numberOfDays" value={formData.numberOfDays} onChange={handleChange} />
        </div>
        <div className="form-group">
          <label htmlFor="reason">Reason:</label>
          <input type="text" id="reason" name="reason" value={formData.reason} onChange={handleChange} />
        </div>
        <div className="form-group">
          <label htmlFor="attachment">Attachment:</label>
          <input type="file" id="attachment" name="attachment" onChange={handleFileChange} />
        </div>
        <div className="form-group" style={{ textAlign: 'center' }}>
          <button className="leave-submit-button" type="submit">Submit</button>
        </div>
      </form>
    </div>
  </div>
  </div>
  );
};

export default LeaveApplicationForm;
