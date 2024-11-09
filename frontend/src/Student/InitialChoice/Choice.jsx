import React, { useEffect, useState } from 'react';
import './Choice.css';
import Header from '../../components/New/Header';
import {initialChoice} from '../../actions/choices'
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const ChoiceList = () => {
  const User = useSelector((state)=>(state.authReducer)).data;
  const navigate = useNavigate();
  const [choices, setChoices] = useState([
    { id: 1, name: 'OS', code:'CS401', sem:8 },
    { id: 2, name: 'DBMS', code:'CS402', sem:8 },
    { id: 3, name: 'CN' , code:'CS403', sem:8},
    { id: 4, name: 'ML' , code:'CS404', sem:8 }
  ]);

  const [selectedBacklogs, setSelectedBacklog] = useState([]);
  const [backlog, setBacklog] = useState([
    { id: 1, name: 'OS', code:'CS401', sem:8 },
    { id: 2, name: 'DBMS', code:'CS402', sem:8 },
    { id: 3, name: 'CN' , code:'CS403', sem:8},
    { id: 4, name: 'ML' , code:'CS404', sem:8 },
    {'subject': {'id': 7, 'code': 'HS101', 'name': 'English', 'sem': 1, 'credit': 4}, 'grade': {'grade': 'F'}}
  ]);
  

  const toggleSelection = (index) => {
    const newBacklog = [...backlog];
    newBacklog[index].selected = !newBacklog[index].selected;
    setBacklog(newBacklog);
  
    const selectedChoice = newBacklog[index];
    const selectedBacklogIndex = selectedBacklogs.findIndex(id => id === selectedChoice.id);
  
    if (selectedChoice.selected && selectedBacklogIndex === -1) {
      // If selected and not already in selectedBacklogs, add it
      setSelectedBacklog(prevState => [...prevState, selectedChoice.id]);
    } else if (!selectedChoice.selected && selectedBacklogIndex !== -1) {
      // If deselected and exists in selectedBacklogs, remove it
      setSelectedBacklog(prevState => prevState.filter(id => id !== selectedChoice.id));
    }
  };
  
  


  const moveUp = (index) => {
    if (index === 0) return;
    const newChoices = [...choices];
    [newChoices[index], newChoices[index - 1]] = [newChoices[index - 1], newChoices[index]];
    setChoices(newChoices);
  };

  const moveDown = (index) => {
    if (index === choices.length - 1) return;
    const newChoices = [...choices];
    [newChoices[index], newChoices[index + 1]] = [newChoices[index + 1], newChoices[index]];
    setChoices(newChoices);
  };

  const onSubmit = async ()=>{
    const c = [];
    choices.forEach(choice=>{
      c.push(choice.id)
    });
    const res = {'choices':c, 'backlogs':selectedBacklogs};
    const data = await initialChoice(res);
    if(data.stat==='C200')
    {
      const timer = setTimeout(() => {
        console.log('Success'); // Set state to show the message after 1 second
        navigate('/');
      }, 1000);
    }
  }

  

  useEffect(()=>{
    if(!User)
    {
      navigate('/');
    }
    if(User?.type !== 'student'){
      navigate('/');
    }
  },)
  return (
  <div>
    <Header/>
    {User && (
    <div className='choice-list'>
      <h2>Student Choices</h2>
      <table>
        <thead>
          <tr>
            <th>Code</th>
            <th>Name</th>
            <th>Up</th>
            <th>Down</th>
          </tr>
        </thead>
        <tbody>
          {choices.map((choice, index) => (
            <tr key={choice.id}>
              <td>{choice.code}</td>
              <td>{choice.name}</td>
              <td><button className='choice-up-button' onClick={() => moveUp(index)} >Move Up</button></td>
              <td><button className='choice-down-button' onClick={() => moveDown(index)} >Move Down</button></td>
            </tr>
          ))}
        </tbody>
      </table>
      <h2>Backlog Selection</h2>
      <table>
        <thead>
          <tr>
            <th>Code</th>
            <th>Name</th>
            <th>Semester</th>
            <th>Select</th>
          </tr>
        </thead>
        <tbody>
          {backlog.map((choice, index) => (
            <tr key={choice.id}>
              <td>{choice.code}</td>
              <td>{choice.name}</td>
              <td>{choice.sem}</td>
              <td><input className='backlog-choice-select'
                type="checkbox"
                checked={choice.selected || false}
                onChange={() => toggleSelection(index)}
              /></td>
            </tr>
          ))}
        </tbody>
      </table>  
      <button  onClick={onSubmit} className='initial-choice-submit-button'>Submit</button>
    </div>)}
  </div>
  );
};

export default ChoiceList;
