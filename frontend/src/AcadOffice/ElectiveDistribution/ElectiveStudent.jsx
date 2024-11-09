import React, { useState} from 'react';
import './ElectiveDistribution.css'
import { distributeElectives, getElectiveStudent } from '../../actions/verification';
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux';

const SubjectsAndStudents = ()=> {

  const User = useSelector((state)=>state.authReducer).data;
  const navigate = useNavigate();
  const [subjects, setSubjects] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');

  const handleCheckboxChange2 = (subjectIndex, studentIndex, event) => {
    const updatedSubjects = [...subjects];
    const student = updatedSubjects[subjectIndex].students[studentIndex];
    const selectedStudents = updatedSubjects[subjectIndex].selectedStudents;
    const selectedStudentIds = updatedSubjects[subjectIndex].selectedStudentIds;

    student.selected = !student.selected;
    

    if (event.shiftKey && selectedStudents.length > 0) {
      const firstSelectedIndex = selectedStudents[0].index;  
      const lastIndex = studentIndex;
      const rangeStart = Math.min(firstSelectedIndex, lastIndex);
      const rangeEnd = Math.max(firstSelectedIndex, lastIndex);

      for (let i = rangeStart; i <= rangeEnd; i++) {
        updatedSubjects[subjectIndex].students[i].selected = true;
        const selectedStudentId = updatedSubjects[subjectIndex].students[i].id;
        if (!selectedStudentIds.includes(selectedStudentId)) {
          selectedStudentIds.push(selectedStudentId);
        }
      }
    } else {
      
      if (student.selected) {
        selectedStudents.push({ ...student, index: studentIndex });
        selectedStudentIds.push(student.id);
      } else {
        updatedSubjects[subjectIndex].selectedStudents = selectedStudents.filter(s => s.id !== student.id);
        updatedSubjects[subjectIndex].selectedStudentIds = selectedStudentIds.filter(id => id !== student.id);
      }
    }

    setSubjects(updatedSubjects);
  };

  

  const getStudents= async () => 
  {
    
    const degreeSelector = document.getElementById('degree-selector');
    const branchSelector = document.getElementById('branch-selector');
    const semesterSelector = document.getElementById('semester-selector');
    const choiceSelector = document.getElementById('choice-selector');
    const data = {}
    if(degreeSelector.value !== '')
    {
      data['degree'] = degreeSelector.value;
      if(branchSelector.value !== '')
      {
        
        data['branch'] = branchSelector.value;
        if(semesterSelector.value !== '')
        {
          
          data['semester'] = semesterSelector.value;
          if(choiceSelector.value !== '')
          {
            data['choice'] = choiceSelector.value;
            if(!User)
          {
            
            navigate('/');
          }
          else
          {
            
            if(User?.type !== 'teacher')
            {
              navigate('/');
            }
            else
            {
              const res = await getElectiveStudent(data);
              if(res.data.length===0)
              {
                setErrorMessage('No Students Avaliable');
              }
              else
              {
                setErrorMessage('');
              }
              if(res?.stat==='C200')
              {
                setSubjects(res?.data.map(subject => ({
                    ...subject,
                    selectedStudents: [], // Initialize selectedStudents array for each subject
                    selectedStudentIds: [] // Initialize selectedStudentIds array for each subject
                  })));
                
              }
            }
          }
          }
          
        }else{
          alert('semester not selected');  
        }
      }else{
        alert('branch not selected');
      }
    }else{
      alert('degree not selected');
    }
  }
  


  const handleSubmit = async () =>{
    const res = [];
    subjects.forEach(sub=>{
      if(sub.selectedStudentIds.length>0){
        res.push({
          'subject': sub.id,
          'students':sub.selectedStudentIds
        })
      }
    })
    
    console.log(res);
    
    setSubjects([]);
    document.getElementById('degree-selector').value = '';
    document.getElementById('branch-selector').value = '';
    document.getElementById('semester-selector').value = '';
    document.getElementById('choice-selector').value = '';

    const data = await distributeElectives(res);
    if(data.stat === 'C200')
    {
      alert('Student Submitted Succesfully');
    }
  }


  return (
    <div style={{minHeight:'500px'}} className="distribution-container">

      <div style={{display:'flex', justifyContent:'space-between', textAlign:'center', alignItems:'center'}}>
        <h2 className="title">Subjects and Students</h2>
        <div className="acad-electives-select-div">
          <select id='degree-selector' className='acad-electives-select'>
            <option value="">Degree</option>
            <option value="btech">Bachlore of Technology</option>
            <option value="mtech">Master of Technology</option>
          </select>
          <select id='branch-selector' className='acad-electives-select'>
            <option value="">Branch</option>
            <option value="CSE">Computer Science</option>
            <option value="ECE">Electronics</option>
          </select>
          <select id='semester-selector' className='acad-electives-select'>
            <option value="">Semester</option>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
            <option value="6">6</option>
            <option value="7">7</option>
            <option value="8">8</option>
          </select>
          <select id='choice-selector' className='acad-electives-select'>
            <option value="">Choice</option>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
            <option value="6">6</option>
            <option value="7">7</option>
          </select>
          <button onClick={getStudents} className='fetch-students-button'>Get Students</button>
        </div>
      </div>
      <p>{errorMessage}</p>
      {subjects.map((subject, subjectIndex) => (
        <div key={subject?.id} className="subject">
          {subject?.students?.length>0 && (<div>
          <h3 className="subject-name">{subject.name}</h3>
          <table className="student-table">
            <thead>
              <tr>
                <th className="index-header">Index</th>
                <th className="name-header">Name</th>
                <th className="name-header">CPI</th>
                <th className="select-header">Select</th>
              </tr>
            </thead>
            <tbody>
              {subject?.students?.map((student, studentIndex) => (
                <tr key={student?.id} className="student-row">
                  <td className="index-cell">{studentIndex + 1}</td>
                  <td className="name-cell">{student.name}</td>
                  <td className="name-cell">{student.cpi}</td>
                  <td className="select-cell">
                    <input style={{transform: 'scale(1.75)'}}
                      type="checkbox" 
                      defaultChecked={student.selected || false} 
                      // onChange={(event) => handleCheckboxChange2(subjectIndex, studentIndex, event)} 
                      onClick={(event) => handleCheckboxChange2(subjectIndex, studentIndex, event)}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          </div>)}
        </div>
      ))}
      {subjects.length>0 &&(
        <button className="submit-btn" onClick={handleSubmit}>Submit</button>
      )}
    </div>
  );
}


export default SubjectsAndStudents;
