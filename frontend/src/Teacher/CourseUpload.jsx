import React, { useState } from 'react';
// import axios from 'axios';
import { useLocation, useNavigate} from "react-router-dom";
import './CourseUpload.css'
import TeacherHeader from '../components/New/TeacherHeader';
import { submitPosts } from '../actions/posts';


function FileUpload() {

  const {state} = useLocation();
  const navigate = useNavigate();  
  const [title, setTitle] = useState('');
  const [files, setFiles] = useState([]);

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    setFiles([...files, selectedFile]);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const formData = new FormData();
    
    for (let i = 0; i < files.length; i++) {
      formData.append(`file${i}`, files[i]);
    }
    
    formData.append('body', title);
    const res = await submitPosts(state?.id, formData);
    if(res.stat === 'C200')
    {
      alert('Post Uploaded Succesfully');
      setTitle([]);
      setFiles([]);
      navigate(`/teacher/course/${state?.code}`, {'state':state})
    }
    else{
      alert('Failed to Post ');
      setTitle([]);
      setFiles([]);
    }
    
  };

  return (
    <div>
      <TeacherHeader/>
      
    <div className='post-upload-form'>
      <div className="course-header">
        <div style={{color:'white', marginLeft:'20px'}}><h2>{state?.code}</h2></div>
      </div>
      <div style={{marginTop:'20px', marginBottom:'20px', color:'InfoText'}}>
        <h3>Upload A Post</h3>  
      </div>
      <form  onSubmit={handleSubmit}>
        <div>
          <label>Title</label><br></br>
          <textarea className='upload-textarea-input' type='text' onChange={e => setTitle(e.target.value)}></textarea>
        </div>
        <div>
          <input  id='FileSelectInput' className='upload-file-input' type="file" onChange={handleFileChange} />
        </div>
        <div>
        <h2>Selected Files:</h2>
        <ul>
          {files.map((file, index) => (
            <div style={{display:'flex'}} key={index}>
              {/* <button className='upload-file-cancel-button' style={{marginRight:'10px', padding:'0px' }}>Remove</button> */}
              <p >{file.name}</p>
            </div>
          ))}
        </ul>
      </div>
        <button className='post-upload-button' type="submit">Upload</button>
      </form>
      
    </div>
  </div>
  );
}

export default FileUpload;
