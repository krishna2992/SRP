import React, { useState } from 'react';
import './ElectiveForm.css'
function SingleChoiceQuestionPage() {
  const choices = {
    'Electives':[
    {
      id: 1,
      name: 'Operating System',
      code:'CS401'
    },
    {
      id: 2,
      name: 'DataBase Management',
      code:'CS402'
    }],
    'HSS':[
      {
        id: 3,
        name: 'Financial Management',
        code:'HS401'
      },
      {
        id: 4,
        name: 'Science Fiction',
        code:'HS404'
    }],
    'Backlog':[
      {
        id: 5,
        name: 'DSA',
        code:'CS301'
      },
      {
        id: 6,
        name: 'Mathematics',
        code:'CS302'
      }],};
  
    const [selectedOptions, setSelectedOptions] = useState([]);
    const [hssSelectedOption, setHSSSelectedOption] = useState(null);

    const handleOptionChange = (option) => {
      const newSelectedOptions = selectedOptions.includes(option)
        ? selectedOptions.filter((item) => item !== option)
        : [...selectedOptions, option];
      setSelectedOptions(newSelectedOptions);
    };

    const handleHssSelect = (option) =>{
      setHSSSelectedOption(option);
    }
  
    const handleSubmit = async () => {
      const formdata = new FormData();
      formdata.append('electives', selectedOptions);
      formdata.append('hss', hssSelectedOption);
    };
  
  

  const renderElectives = () => {
    return choices['Electives'].map((q, index) => (
      <div className='option-div' key={index}>
        <label style={{fontSize:'large'}} htmlFor={`option${index}${q.id}`}>
        <input id={`option${index}${q.id}`}
                type="checkbox"
                value={q.code}
                checked={selectedOptions.includes(q.code)}
                onChange={() => handleOptionChange(q.code)}
              />
        {q.code}{' '}{q.name}</label>
      </div>
    ));
  };

  const renderHSS = () => {
    return choices['HSS'].map((q, index) => (
      <div className='option-div' key={index}>
        <label style={{fontSize:'large'}} htmlFor={`option${index}${q.id}`}>
        <input  id={`option${index}${q.id}`}
                type="radio"
                value={q.code}
                checked={hssSelectedOption === q.code}
                onChange={() => handleHssSelect(q.code)}
              />
        {q.code}{' '}{q.name}</label>
      </div>
    ));
  };

  const renderBacklog = () =>{
    if(!choices?.Backlog)
    {
      return <p>No Current Backlogs</p>
    }
    return choices?.Backlog.map((q, index) => (
      <div className='option-div' key={index}>
        <label style={{fontSize:'large'}} htmlFor={`option${index}${q.id}`}>
        <input id={`option${index}${q.id}`}
                type="checkbox"
                value={q.code}
                checked={selectedOptions.includes(q.code)}
                onChange={() => handleOptionChange(q.code)}
              />
        {q.code}{' '}{q.name}</label>
      </div>
    ));
 
  }

  return (
    <div>
    <div >
        <header  className='elective-container-main-header'>
            <h1>Elective Choice Form</h1> 
        </header>
        <div className='elective-main-container'>
          <div className='question-container'>
          <header className='general-elective-header'><h2>Electives</h2></header>
          <div style={{marginTop:'10px'}}>
            {renderElectives('Electives')}
          </div>
          </div>
          <div className='question-container'>
          <header className='hss-elective-header'><h2>HSS</h2></header>
          <div style={{marginTop:'10px'}}>
            {renderHSS()} 
          </div>
          </div>
          <div className='question-container'>
          <header className='hss-elective-header'><h2>Backlogs</h2></header>
          <div style={{marginTop:'10px'}}>
            {renderBacklog()} 
          </div>
          </div>
        </div>
        <div className='elective-button-div'>
          <button onClick={handleSubmit}>Submit</button>
        </div>
    </div>
    </div>
  );
}

export default SingleChoiceQuestionPage;