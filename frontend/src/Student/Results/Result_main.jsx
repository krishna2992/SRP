import React, { useEffect, useState } from 'react';
// import generatePDF, { Resolution, Margin} from 'react-to-pdf';
import Header from '../../components/New/Header';
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import logo from '../../Assets/icon.png'
import { jsPDF } from "jspdf";

import { getResults } from "../../actions/results";


// const options = {
//   filename: 'student_results.pdf',
//   method: 'save',
//   resolution: Resolution.LOW,
//   page: {
//     margin: Margin.SMALL,
//     format: 'letter',
//     orientation: 'portrait'
//   }
// };

// const getTargetElement = () => document.getElementById('container');

// const downloadPdf = () => generatePDF(getTargetElement, options);



  const StudentResults2 = ({ Results }) => {

    const pushbackArray = [];
    // Function to calculate CPI for a semester
    const calculateCPI = (results) => {
      let totalCredits = 0;
      let weightedGradePoints = 0;

      const subjectCountsPerSemester = {};
      results.forEach(element=>{
        if(element.code.at(-1) === '*')
        {
          element.code = element.code.slice(0, -1);
        }
        if(!subjectCountsPerSemester[element.code])
        {
          subjectCountsPerSemester[element.code]=1;
        }
        else{
          subjectCountsPerSemester[element.code]+=1;
        }
      })

      
      results.forEach((result) => {
        if(subjectCountsPerSemester[result.code] === 1)
        {
            
          totalCredits += result.credit;
          weightedGradePoints += result.credit * getGradePoint(result.grade);
        
        }
        else{
          if(result.grade !== 'F')
          {
            
            totalCredits += result.credit;
            weightedGradePoints += result.credit * getGradePoint(result.grade);
          }
        }
      });
      let finalGrade = totalCredits === 0 ? 0 : (weightedGradePoints / totalCredits).toFixed(2);
      pushbackArray.push(finalGrade);
      
      return finalGrade;
    };

    const calculateFinalCPI = (n) =>{
      let final = 0;
      for(let i=0; i<n; i++)
      {
        final+=parseFloat(pushbackArray[i]);
      }
      return (final / n).toFixed(2);
    }
  
    // Function to get grade point for a grade
    const getGradePoint = (grade) => {
      switch (grade) {
        case 'AA':
          return 10;
        case 'AB':
          return 9;
        case 'BB':
          return 8;
        case 'BC':
          return 7;
        case 'CC':
          return 6;
        case 'CD':
          return 5;
        case 'DD':
            return 4;
        default:
          return 0;
      }
    };

    function transformResults(data) {
      const semesters = [];
      
      // Group results by semester
      data.forEach(result => {        
        const { sem:semester, ...rest } = result;
        const existingSemester = semesters.find(s => s.semester === semester);
    
        if (existingSemester) {
          existingSemester.results.push(rest);
        } else {
          semesters.push({ semester, results: [rest] });
        }
      });
      semesters.sort((a, b) => a.semester - b.semester);
    
      return semesters;
    }
    
    const studentResults = transformResults(Results);
    const semestersPairs = [];
    for (let i = 0; i < studentResults.length; i += 2) {
      semestersPairs.push(studentResults.slice(i, i + 2));
    }

    const customSort = (results) =>{
      const subjectCountsPerSemester = {};
      results.forEach(element => {
        if(!subjectCountsPerSemester[element.code])
        {
          subjectCountsPerSemester[element.code]=1;
        }
        else{
          subjectCountsPerSemester[element.code]+=1;
        }
      });
        const resultArray = []
        results.forEach(element=>{
          if(subjectCountsPerSemester[element.code] === 1){
            resultArray.push(element);
          }
        })
        results.forEach(element=>{
          if(subjectCountsPerSemester[element.code] === 2){
            if(element.grade !== 'F')
            {
              element.code+='*';
            }
            resultArray.push(element);
          }
        })
        
        return resultArray;
    }

    const getCurrentDate = () => {
      const currentDate = new Date();
      return `${currentDate.getDate()}/${currentDate.getMonth() + 1}/${currentDate.getFullYear()}`;
    };
    return (
      <div style={{ minHeight: '220vh', position: 'relative' }}>
        {semestersPairs?.map((pair, index) => (
          <div key={index} style={{ display: 'flex', justifyContent: 'space-between' }}>
            {pair.map((semester, i) => (
              <table key={i} style={{ borderCollapse: 'collapse', width: 'calc(50% - 10px)', margin: '0 5px', border: 'none', marginBottom:'50px' }}>
                <thead>
                  {index<1 && (
                  <tr>
                    <th style={{ padding: '8px', textAlign: 'left', fontSize: '25px' }}>Course</th>
                    <th style={{ padding: '8px', textAlign: 'left', fontSize: '25px' }}>Course Name</th>
                    <th style={{ padding: '8px', textAlign: 'left', fontSize: '25px' }}>Gr.</th>
                    <th style={{ padding: '8px', textAlign: 'left', fontSize: '25px' }}>Cr.</th>
                  </tr>
                  )}
                  <tr>
                    <th style={{ padding: '8px', textAlign: 'left', fontSize: '25px' }} colSpan="2">Semester {semester.semester}</th>
                  </tr>
                </thead>
                <tbody>
                  {customSort(semester.results).map((result, j) => (
                                        <tr key={j}>
                      <td style={{ padding: '8px', fontSize: '25px' }}>{result.code}</td>
                      <td style={{ padding: '8px', fontSize: '25px' }}>{result.name}</td>
                      <td style={{ padding: '8px', fontSize: '25px' }}>{result.grade}</td>
                      <td style={{ padding: '8px', fontSize: '25px' }}>{result.credit}</td>
                    </tr>
                    
                  ))}
                </tbody>
              </table>
            ))}
          </div>
        ))}
        {/* Cumulative Performance Index (CPI) Table */}
        
        <table style={{ borderCollapse: 'collapse', width: '100%', position: 'absolute', bottom: '0', left: '50%', transform: 'translateX(-50%)' }}>
          <thead>
            <tr>
              <th style={{ border: '1px solid #000', padding: '8px', textAlign: 'left', fontSize: '30px' }}>Semester</th>
              <th style={{ border: '1px solid #000', padding: '8px', textAlign: 'left', fontSize: '30px' }}>SPI</th>
              <th style={{ border: '1px solid #000', padding: '8px', textAlign: 'left', fontSize: '30px' }}>CPI</th>
            </tr>
          </thead>
          <tbody>
            {studentResults?.map((semester, index) => (
              <tr key={index}>
                <td style={{ border: '1px solid #000', padding: '8px', fontSize: '30px' }}>Semester {semester.semester}</td>
                <td style={{ border: '1px solid #000', padding: '8px', fontSize: '30px' }}>{calculateCPI(semester.results)}</td>
                <td style={{ border: '1px solid #000', padding: '8px', fontSize: '30px' }}>{calculateFinalCPI(index+1)}</td>
              </tr>
              
            ))}
          </tbody>
          <h3 style={{  marginTop: '10px' }}> Date: {getCurrentDate()}</h3>
        </table>
        
      </div>
      
    );
  };

const Container = ({ children }) => {
    return (
      <div style={{ padding: '20px', border: '1px solid #ccc', borderRadius: '5px' }}>
        {children}
      </div>
    );
  };

  const Button = ({ onClick, children }) => {
    return (
      <button onClick={onClick} style={{ padding: '10px', backgroundColor: '#007bff', color: '#fff', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>
        {children}
      </button>
    );
  };
  
// const redndunt = () =>{
//   return(
//     <div className='redundant-div'>
//     </div>
//   )
// }

const Result_Main = () => {

    const navigate = useNavigate();
    const User = useSelector((state)=> state.authReducer).data;
    const [Results, setResults] = useState([
        // { code: 'ENG101', name: 'English', grade: 'A', credit: 3, sem:1 },
        // { code: 'MAT101', name: 'Mathematics', grade: 'B', credit: 4 , sem:1 },
        // { code: 'PHY101', name: 'Physics', grade: 'F', credit: 3, sem:1  },
        // { code: 'PHY101', name: 'Physics', grade: 'A', credit: 3 , sem:1 },
        
      
        // { code: 'ENG101', name: 'English', grade: 'A', credit: 3 , sem:2 },
        // { code: 'MAT101', name: 'Mathematics', grade: 'B', credit: 4 , sem:2 },
        // { code: 'PHY101', name: 'Physics', grade: 'F', credit: 3 , sem:2 },
        // { code: 'PHY101', name: 'Physics', grade: 'A', credit: 3, sem:2  },
      
        // { code: 'ENG101', name: 'English', grade: 'A', credit: 3 , sem:3 },
        // { code: 'MAT101', name: 'Mathematics', grade: 'B', credit: 4 , sem:3 },
        // { code: 'PHY101', name: 'Physics', grade: 'F', credit: 3 , sem:3 },
        // { code: 'PHY101', name: 'Physics', grade: 'A', credit: 3 , sem:3 },
      
      
        // { code: 'ENG101', name: 'English', grade: 'A', credit: 3 , sem:4 },
        // { code: 'MAT101', name: 'Mathematics', grade: 'B', credit: 4 , sem:4 },
        // { code: 'PHY101', name: 'Physics', grade: 'F', credit: 3, sem:4  },
        // { code: 'PHY101', name: 'Physics', grade: 'A', credit: 3, sem:4  },
      
        // { code: 'ENG101', name: 'English', grade: 'A', credit: 3, sem:5  },
        // { code: 'MAT101', name: 'Mathematics', grade: 'B', credit: 4 , sem:5 },
        // { code: 'PHY101', name: 'Physics', grade: 'F', credit: 3, sem:5 },
        // { code: 'PHY101', name: 'Physics', grade: 'A', credit: 3, sem:5 },
      ])

      const getStudentResults = async ()=>{
        await getResults().then((res) => setResults(res));
    }

    const getDiscipline = (discipline)=>{
      if(discipline === 'cse'){
        return 'Computer Science and Engineering'
      }
      else if(discipline === 'ece'){
        return 'Electrinics and Communication Engineering'
      }
      else{
        return discipline.toUpperCase();
      }
      
    }

    const getDegree = (degree) =>{
      if(degree === 'btech'){
        return 'Bachelor of Technology Grade Card (Semester I to VIII)'
      }
      if(degree === 'mtech')
      {
        return 'Master of Technology Grade Card (Semester I to IV)'
      }
      return degree.toUpperCase()
    }

    useEffect(()=>{
        if(!User)
        {
            navigate('/');
            return;
        }
        if(User?.type !== 'student')
        {
          navigate('/');
          return;
        }
        getStudentResults();
    },[])

    const downloadPdf2 = () => {
      const doc = new jsPDF({
        orientation: "portrait",
        unit: "px",
        format: [1600, 5000], // Adjust dimensions as needed
      });
  
      
      const logoWidth = 500; 
      const logoHeight = 100; 
      const headerHeight = 100; 
      doc.addImage(logo, 'PNG', doc.internal.pageSize.getWidth() / 2 - logoWidth / 2, 10, logoWidth, logoHeight);
  
      
      const content = document.getElementById('pdf-content');
      doc.html(content, {
        callback: function () {
          doc.save('student_results.pdf');
        },
        x: 30,
        y: headerHeight + 20, // Adjust positioning to leave space for the header
      });
    };
  
  return (
    <div >
        <Header/>
      <div style={{minHeight:'500px'}}>
      {Results?.length>0 ? (
    <Container style={{minHeight: '180vh'}}>
      <Button onClick={downloadPdf2}>Download PDF</Button>
      <div id='pdf-content'>
      <div id="container">
        
        <div style={{textAlign:'center', display:'flex', justifyContent:'center'}}>
          {/* <img style={{width:'100px', height:'100px'}} src={iiitg_long}></img> */}
          <div>
            <h1>INDIAN INSTITUTE OF INFORMATION AND TECHNOLOGY</h1>
              <h2>{getDegree(User?.course)}</h2>
          </div>
          
          
        </div>
            <div style={{display:'flex', justifyContent:'space-between', marginLeft:'10%', marginRight:'10%', marginBottom:'25px'}}>
              <div style={{fontSize:'large'}}> 
                <h3>Name: {User?.name.toUpperCase()}</h3>
                <h3>Discipline: {getDiscipline(User?.branch)}</h3>
                <h3>Roll: {User?.roll}</h3>
              </div>
              
            </div>
        </div>
        <StudentResults2 Results={Results} />
        
      </div>
    </Container>):(<p style={{marginLeft:'10%'}}>No Results Available</p>)}
    </div>
    </div>
  );
};

export default Result_Main;
