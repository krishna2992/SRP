import React, { useEffect, useState } from 'react';
import './ElectiveSelection.css'
import { getOptionSubjects, getStudentBacklogs, submitElectives } from '../../actions/choices';
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';

const ElectiveSelection = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch()
  const User = useSelector((state)=> (state.authReducer)).data;
  
  const [subjects, setSubjects] = useState([]);

  const [backlogs, setBacklogs] = useState([]);
  const [hss, setHss] = useState([]);

  
  const [options, setOptions] = useState([]);

  const fetchOpionElectives = async() =>{
    const course = User?.course;
    const branch = User?.branch;
    const userData = await getOptionSubjects({'sem':User?.sem, 'branch':branch, 'degree':course});
    
    if(userData.stat==='C200')
    {
      setHss(userData.data.subjects.filter(subject => subject.type === 'HSS'));
      setOptions(userData.data.options);
      setSubjects(userData.data.subjects.filter(subject => subject.type !== 'HSS'));
    }
  }

  const getBacklogs = async () =>{
    const data = await getStudentBacklogs(User?.id);
    if(data.stat === 'C200')
    {
      setBacklogs(data.data);
    }else{
      setError(data.msg);
    }
  }

  useEffect(()=>{
    fetchOpionElectives();
    getBacklogs();
  }, [])

  const [selectedHss, setSelectedHss] = useState();
  const [selectedSubjects, setSelectedSubjects] = useState([]);
  const [error, setError] = useState('');
  const [selectedBacklogs, setSelectedBacklogs] = useState([])
  
  const [selectedOption, setSelectedOption] = useState(null);

  const handleBacklog = (subjectId) =>{

    setError('');
    const isBacklogSelected = selectedBacklogs.includes(subjectId);
    
    if(isBacklogSelected){
      setSelectedBacklogs(selectedBacklogs.filter(id=>id!==subjectId));
    }
    else{
      setSelectedBacklogs([...selectedBacklogs, subjectId]);
    }
  }

  const handleHssSelect = (subjectId) =>{
    setError('');
    setSelectedHss(subjectId);
  }
  
  const handleSubjectSelect = (subjectId) => {
    setError('');
    const isSubjectSelected = selectedSubjects.includes(subjectId);
    if (isSubjectSelected) {
      
      setSelectedSubjects(selectedSubjects.filter(id => id !== subjectId));
    } else {
      
      if (selectedSubjects.length < maxElectives()) {
        
        setSelectedSubjects([...selectedSubjects, subjectId]);
      } else {
        
        setError('You have already selected the maximum number of electives allowed for this option.')
        
      }
    }
  };

  // Function to handle option selection
  const handleOptionSelect = (optionId) => {
    setError('');
    setSelectedOption(optionId);
    // Empty selected subjects when option changes
    setSelectedSubjects([]);
  };

  
  const maxElectives = () => {
    const selectedOpt = options.find(opt => opt.id === selectedOption);
    
    return selectedOpt ? selectedOpt.subjects : 0; 
  };

  const allCompulsorySelected = () => {
    const compulsorySubjects = subjects.filter(subject => subject.type === 'compulsory');
    return compulsorySubjects.every(subject => selectedSubjects.includes(subject.id));
  };

  const isHSSSELECTED = () =>{
    return selectedHss !== null;
  }


  const handleSubmit = async () => {
    if(!isHSSSELECTED())
    {
      setError('Please Select HSS subject');
    }
    else
    {
      if (allCompulsorySelected()) {
        const req = {};
        req['backlogs'] = selectedBacklogs;
        req['subjects'] = selectedSubjects;
        req['subjects'].push(selectedHss);
        console.log(req);
        const data = await dispatch(submitElectives(User?.id, req));
        if(data.stat === 'C200')
        {
          alert('Electives Submitted Succesfully')
          console.log(data);
          navigate('/student/home')
        }
        else{
          alert('Failed Submitted Succesfully')
          console.log(data);
          setSelectedBacklogs([]);
          setSelectedHss(null);
          setSelectedOption(null);
        }
        
      
      } else {
        setError('Please select all compulsory subjects before submission.')
      }
    } 
  };

  return (
    <div>

    <div className='choice-main-container'>
      
      <h2 className='option-h2'>Elective Selection</h2>
      
      <div style={{marginTop:'20px'}}>
        <h3>Choose Option:</h3>
        <table style={{marginTop:'20px'}} className="subject-table">
          <thead>
            <tr>
              <th>Select</th>
              <th>Option</th>
              <th>Subjects</th>
              <th>Internship</th>
              <th>Project</th> 
            </tr>
          </thead>
          <tbody>
            {options?.map(option => (
              <tr key={option.id}>
                <td>
                <input className='option-radio'
                type="radio"
                name="options"
                value={option.id}
                checked={selectedOption === option.id}
                onChange={() => handleOptionSelect(option.id)}
              />
                </td>
                <td>{option.name}</td>
                <td>{option.subjects}</td>
                <td>{option.internship?'Required':'None'}</td>
                <td>{option.project?'Required':'None'}</td>
                
              </tr>
            ))}
          </tbody>
        </table>
        
      </div>  

      <div style={{marginTop:'20px'}}>
        <h3>Choose Elective Subjects:</h3>
        <table style={{marginTop:'20px'}} className="subject-table">
          <thead>
            <tr>
            <th>Select</th>
              <th>Name</th>
              <th>Type</th>
              <th>Credits</th>
              
            </tr>
          </thead>
          <tbody>
            {subjects?.map(subject => (
              <tr key={subject.id}>
                <td>
                  <input className='subject-checkbox'
                    type="checkbox"
                    checked={selectedSubjects.includes(subject.id)}
                    onChange={() => handleSubjectSelect(subject.id)}
                  />
                </td>
                <td>{subject.name}</td>
                <td>{subject.type}</td>
                <td>{subject.credit}</td>
                
              </tr>
            ))}
          </tbody>
        </table>
        
      </div>

      <div style={{marginTop:'20px'}}>
        <h3>Choose HSS Subject:</h3>
        <table style={{marginTop:'20px'}} className="subject-table">
          <thead>
            <tr>
            <th>Select</th>
              <th>Name</th>
              <th>Type</th>
              <th>Credits</th>
              
            </tr>
          </thead>
          <tbody>
            {hss?.map(subject => (
              <tr key={subject.id}>
                <td>
                  <input className='subject-checkbox'
                    type="radio"
                    checked={selectedHss===subject.id}
                    onChange={() => handleHssSelect(subject.id)}
                  />
                </td>
                <td>{subject.name}</td>
                <td>{subject.type}</td>
                <td>{subject.credit}</td>
                
              </tr>
            ))}
          </tbody>
        </table>
        
      </div>
      
      <div style={{marginTop:'20px'}}>
        <h3>Choose Backlog Subjects:</h3>
        {backlogs.length>0 ? (
        <table style={{marginTop:'20px'}} className="subject-table">
          <thead>
            <tr>
            <th>Select</th>
              <th>Name</th>
              <th>Type</th>
              <th>Credits</th>
              
            </tr>
          </thead>
          <tbody>
            {backlogs?.map(subject => (
              <tr key={subject.id}>
                <td>
                  <input className='subject-checkbox'
                    type="checkbox"
                    checked={selectedBacklogs.includes(subject.subject.id)}
                    onChange={() => handleBacklog(subject.subject.id)}
                  />
                </td>
                <td>{subject.subject.name}</td>
                <td>Backlog</td>
                <td>{subject.subject.credit}</td>
                
              </tr>
            ))}
          </tbody>
        </table>):<p>No Current backlogs</p>}
        
      </div>
      <div>
        <p style={{color:'red'}}>{error}</p>
      </div>
      <div>
        <button className='submit-button' onClick={handleSubmit}>Submit</button>
      </div>
    </div>
    </div>
  );
};

export default ElectiveSelection;
