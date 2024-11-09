import React, { useState } from 'react';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom'
import { useSelector} from 'react-redux';
import { submitBonafideApplication } from '../../actions/applications';
import './Bonafide.css'
import Header from '../../components/New/Header';

const BonafideSubmitPage = () => {
  const [subject, setSubject] = useState('');
  const [body, setBody] = useState('');
  const navigate = useNavigate();
  const User = useSelector((state)=> (state.authReducer)).data;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (body.length > 255) {
      alert('Body must be 255 characters or less.');
      return; // Do not proceed with form submission
    }
    try {
      const response = await submitBonafideApplication({'student':User?.id, 'subject':subject, 'body':body})
      console.log('Bonafide application submitted successfully:', response.data);
      navigate('/student/home')
      
    } catch (error) {
      alert('Failed to Submit Application');
      console.error('Error submitting bonafide application:', error);
      
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

  // Function to handle changes in the body input
  const handleBodyChange = (e) => {
    const inputValue = e.target.value;
    // Check if input exceeds 255 characters
    if (inputValue.length <= 255) {
      setBody(inputValue); // Set body state if within limit
    } else {
      // Truncate input to 255 characters
      setBody(inputValue.slice(0, 255));
    }
  };

  return (
    <div>
      <Header/>
      <div style={{fontSize:'x-large'}}>
        <div className="bonafide-submit-container">
          <h2 className="bonafide-submit-heading">Submit Bonafide Application</h2>
          <form className="bonafide-form" onSubmit={handleSubmit}>
            <div>
              <label htmlFor="subject">Subject:</label>
              <input style={{fontSize:'18px'}} type="text" id="subject" className="bonafide-input" value={subject} onChange={(e) => setSubject(e.target.value)} required />
            </div>
            <div>
              <label htmlFor="body">Body:</label>
              <textarea style={{fontSize:'18px'}} id="body" className="bonafide-textarea" value={body} onChange={handleBodyChange} required />
              <span className="character-count">{body.length}/255</span>
            </div>
            {body.length > 255 && <div className="error-message">Body must be 255 characters or less.</div>}
            <button type="submit" className="bonafide-submit-button">Submit</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default BonafideSubmitPage;
