import React, { useState } from 'react';
import './Test.css'

// class StudentMarksTable extends React.Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       studentMarks: [
//         { subjectName: 'Mathematics', subjectCode: 'MATH101', semester: 1, grade: 'A' },
//         { subjectName: 'Physics', subjectCode: 'PHY101', semester: 1, grade: 'B' },
//         { subjectName: 'Chemistry', subjectCode: 'CHEM101', semester: 1, grade: 'A' },
//         { subjectName: 'Biology', subjectCode: 'BIO101', semester: 2, grade: 'A-' },
//         { subjectName: 'History', subjectCode: 'HIST101', semester: 2, grade: 'B+' },
//         { subjectName: 'Geography', subjectCode: 'GEOG101', semester: 2, grade: 'A' },
//       ]
//     };
//   }

//   render() {
//     const semesters = [...new Set(this.state.studentMarks.map(mark => mark.semester))];

//     return (
//     <div>
//       <div className='grade-main-container'>
//         {semesters.map((semester, index) => (
//           <div key={index}>
//             <h2>Student Grades for Semester {semester}</h2>
//             <table className='table-class'>
//               <thead>
//                 <tr>
//                   <th className='table-th-tr table-header-th'>Subject Name</th>
//                   <th className='table-th-tr table-header-th'>Subject Code</th>
//                   <th className='table-th-tr table-header-th'>Semester</th>
//                   <th className='table-th-tr table-header-th'>Grade</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {this.state.studentMarks
//                   .filter(mark => mark.semester === semester)
//                   .map((mark, index) => (
//                     <tr key={index}>
//                       <td className='table-th-tr'>{mark.subjectName}</td>
//                       <td className='table-th-tr'>{mark.subjectCode}</td>
//                       <td className='table-th-tr'>{mark.semester}</td>
//                       <td className='table-th-tr'>{mark.grade}</td>
//                     </tr>
//                   ))}
//               </tbody>
//             </table>
//           </div>
//         ))}
//       </div>
//     </div>
//     );
//   }
// }

// export default StudentMarksTable;


// function SingleChoiceQuestionPage() {
//   // State variables
//   const questions = {
//     'Electives':[
//     {
//       id: 1,
//       question: 'What is the capital of France?',
//       options: ['London', 'Paris', 'Berlin', 'Madrid']
//     },
//     {
//       id: 2,
//       question: 'What is the largest mammal?',
//       options: ['Elephant', 'Whale', 'Giraffe', 'Lion']
//     }],
//     'HSS':[
//       {
//         id: 4,
//         question: 'What is the capital of France?',
//         options: ['London', 'Paris', 'Berlin', 'Madrid']
//       },
//       {
//         id: 5,
//         question: 'What is the largest mammal?',
//         options: ['Elephant', 'Whale', 'Giraffe', 'Lion']
//     }]};
  
//   const [dictionary, setDictionary] = useState({});

  
//   const addEntry = (key, value) => {
//     setDictionary(prevDictionary => ({
//       ...prevDictionary,
//       [key]: value
//     }));
//   };

//   const handleOptionSelect = (option, qid) => {
//     addEntry(qid, option);
//   };

//   const handleSubmit = () =>{
//     console.log(dictionary);
//   }

//   // Render options
//   const renderOptions = (options, id) => {
//     return options.map((option, index) => (
//       <div className='option-div' key={index}>
//         <input
//           type="radio"
//           id={`option${index}${id}`}
//           name={`${id}options`}
//           value={option}
//           onChange={() => handleOptionSelect(option, id)}
//         />
//         <label style={{fontSize:'large'}} htmlFor={`option${index}${id}`}>{option}</label>
//       </div>
//     ));
//   };

//   // Render questions
//   const renderQuestions = (type) => {
//     return questions[type].map((q) => (
//       <div className='question-div' key={q.id}>
//         <h2 style={{textDecoration:'none'}}>{q.question}</h2>
//         <form>
//           {renderOptions(q.options, q.id)}
//         </form>
//       </div>
//     ));
//   };

//   return (
//     <div>
      
//     <div >
//         <header className='elective-container-main-header'>
//             <h1>Elective Choice Form</h1> 
//         </header>
//         <div className='elective-main-container'>
          
//           {Object?.entries(questions).map(([key, value]) => (
//             <div key={key} className='question-container'>
//                 <header className='general-elective-header'><h2>{key}</h2></header>
//                 {renderQuestions(key)}
//             </div>
//           ))}
//           {/* <div className='question-container'>
//             <header className='general-elective-header'><h2>Electives</h2></header>
//             {renderQuestions('Electives')}
//           </div>
//           <div className='question-container'>
//           <header className='hss-elective-header'><h2>HSS</h2></header>
//           {renderQuestions('HSS')} 
//           </div> */}
//         </div>
//         <div className='elective-button-div'>
//           <button onClick={handleSubmit}>Submit</button>
//         </div>
//     </div>
//     </div>
//   );
// }

// export default SingleChoiceQuestionPage;


// import React, { useState } from 'react';

const MultiSelectOptions = () => {
  // State to keep track of selected options
  const [selectedOptions, setSelectedOptions] = useState([]);

  // Handler function to toggle selection of an option
  const toggleOption = (option) => {
    if (selectedOptions.includes(option)) {
      setSelectedOptions(selectedOptions.filter((item) => item !== option));
    } else {
      setSelectedOptions([...selectedOptions, option]);
    }
  };

  return (
    <div>
      <h2>Select Multiple Options</h2>
      <form>
        <label>
          <input
            type="checkbox"
            value="Option 1"
            checked={selectedOptions.includes('Option 1')}
            onChange={() => toggleOption('Option 1')}
          />
          Option 1
        </label>
        <br />
        <label>
          <input
            type="checkbox"
            value="Option 2"
            checked={selectedOptions.includes('Option 2')}
            onChange={() => toggleOption('Option 2')}
          />
          Option 2
        </label>
        <br />
        <label>
          <input
            type="checkbox"
            value="Option 3"
            checked={selectedOptions.includes('Option 3')}
            onChange={() => toggleOption('Option 3')}
          />
          Option 3
        </label>
        <br />
        <label>
          <input
            type="checkbox"
            value="Option 4"
            checked={selectedOptions.includes('Option 4')}
            onChange={() => toggleOption('Option 4')}
          />
          Option 4
        </label>
      </form>
      <div>
        <h3>Selected Options:</h3>
        <ul>
          {selectedOptions.map((option, index) => (
            <li key={index}>{option}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default MultiSelectOptions;
