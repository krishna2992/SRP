import React, { useState } from 'react';
import axios from 'axios';

function FileUpload() {
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
    
    formData.append('title', title);
    
    try {
      const response = await axios.post('http://localhost:8000/api/posts', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      console.log('Files uploaded successfully:', response.data);
    } catch (error) {
      console.error('Error uploading files:', error);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input type='text' onChange={e => setTitle(e.target.value)}></input>
        <input type="file" onChange={handleFileChange} />
        <button type="submit">Upload</button>
      </form>
      <div>
        <h2>Selected Files:</h2>
        <ul>
          {files.map((file, index) => (
            <li key={index}>{file.name}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default FileUpload;
