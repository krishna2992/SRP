import React from 'react';
import generatePDF, { Resolution, Margin} from 'react-to-pdf';
import iiitg_long from './logo.svg'
// Mock student results data
const Results = [
      { subjectCode: 'ENG101', subjectName: 'English', grade: 'A', credit: 3, sem:1 },
      { subjectCode: 'MAT101', subjectName: 'Mathematics', grade: 'B', credit: 4 , sem:1 },
      { subjectCode: 'PHY101', subjectName: 'Physics', grade: 'F', credit: 3, sem:1  },
      { subjectCode: 'PHY101', subjectName: 'Physics', grade: 'A', credit: 3 , sem:1 },
      
    
      { subjectCode: 'ENG101', subjectName: 'English', grade: 'A', credit: 3 , sem:2 },
      { subjectCode: 'MAT101', subjectName: 'Mathematics', grade: 'B', credit: 4 , sem:2 },
      { subjectCode: 'PHY101', subjectName: 'Physics', grade: 'F', credit: 3 , sem:2 },
      { subjectCode: 'PHY101', subjectName: 'Physics', grade: 'A', credit: 3, sem:2  },
    
      { subjectCode: 'ENG101', subjectName: 'English', grade: 'A', credit: 3 , sem:3 },
      { subjectCode: 'MAT101', subjectName: 'Mathematics', grade: 'B', credit: 4 , sem:3 },
      { subjectCode: 'PHY101', subjectName: 'Physics', grade: 'F', credit: 3 , sem:3 },
      { subjectCode: 'PHY101', subjectName: 'Physics', grade: 'A', credit: 3 , sem:3 },
    
    
      { subjectCode: 'ENG101', subjectName: 'English', grade: 'A', credit: 3 , sem:4 },
      { subjectCode: 'MAT101', subjectName: 'Mathematics', grade: 'B', credit: 4 , sem:4 },
      { subjectCode: 'PHY101', subjectName: 'Physics', grade: 'F', credit: 3, sem:4  },
      { subjectCode: 'PHY101', subjectName: 'Physics', grade: 'A', credit: 3, sem:4  },
    
      { subjectCode: 'ENG101', subjectName: 'English', grade: 'A', credit: 3, sem:5  },
      { subjectCode: 'MAT101', subjectName: 'Mathematics', grade: 'B', credit: 4 , sem:5 },
      { subjectCode: 'PHY101', subjectName: 'Physics', grade: 'F', credit: 3, sem:5 },
      { subjectCode: 'PHY101', subjectName: 'Physics', grade: 'A', credit: 3, sem:5 },
    ]

  // Add more semesters and subjects as needed


const options = {
  filename: 'student_results.pdf',
  method: 'save',
  resolution: Resolution.LOW,
  page: {
    margin: Margin.SMALL,
    format: 'letter',
    orientation: 'portrait'
  }
};

const getTargetElement = () => document.getElementById('container');

const downloadPdf = () => generatePDF(getTargetElement, options);



  const StudentResults2 = ({ Results }) => {

    const pushbackArray = [];
    // Function to calculate CPI for a semester
    const calculateCPI = (results) => {
      let totalCredits = 0;
      let weightedGradePoints = 0;

      const subjectCountsPerSemester = {};
      results.forEach(element=>{
        if(element.subjectCode.at(-1) === '*')
        {
          element.subjectCode = element.subjectCode.slice(0, -1);
        }
        if(!subjectCountsPerSemester[element.subjectCode])
        {
          subjectCountsPerSemester[element.subjectCode]=1;
        }
        else{
          subjectCountsPerSemester[element.subjectCode]+=1;
        }
      })

      
      results.forEach((result) => {
        if(subjectCountsPerSemester[result.subjectCode] === 1)
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
        case 'A+':
          return 10;
        case 'A':
          return 9;
        case 'B+':
          return 8;
        case 'B':
          return 7;
        case 'C':
          return 6;
        case 'D':
          return 5;
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
        if(!subjectCountsPerSemester[element.subjectCode])
        {
          subjectCountsPerSemester[element.subjectCode]=1;
        }
        else{
          subjectCountsPerSemester[element.subjectCode]+=1;
        }
      });
        const resultArray = []
        results.forEach(element=>{
          if(subjectCountsPerSemester[element.subjectCode] === 1){
            resultArray.push(element);
          }
        })
        results.forEach(element=>{
          if(subjectCountsPerSemester[element.subjectCode] === 2){
            if(element.grade !== 'F')
            {
              element.subjectCode+='*';
            }
            resultArray.push(element);
          }
        })
        
        return resultArray;
    }
  
    return (
      <div>
        {semestersPairs.map((pair, index) => (
          <div key={index} style={{ display: 'flex', justifyContent: 'space-between' }}>
            {pair.map((semester, i) => (
              <table key={i} style={{ borderCollapse: 'collapse', width: 'calc(50% - 10px)', margin: '0 5px', border: 'none', marginBottom:'50px' }}>
                <thead>
                  <tr>
                    <th style={{ padding: '8px', textAlign: 'left', fontSize: '30px' }} colSpan="2">Semester {semester.semester}</th>
                  </tr>
                  <tr>
                    <th style={{ padding: '8px', textAlign: 'left', fontSize: '30px' }}>Subject Code</th>
                    <th style={{ padding: '8px', textAlign: 'left', fontSize: '30px' }}>Subject Name</th>
                    <th style={{ padding: '8px', textAlign: 'left', fontSize: '30px' }}>Grade</th>
                    <th style={{ padding: '8px', textAlign: 'left', fontSize: '30px' }}>Credit</th>
                  </tr>
                </thead>
                <tbody>
                  {customSort(semester.results).map((result, j) => (
                    <tr key={j}>
                      <td style={{ padding: '8px', fontSize: '30px' }}>{result.subjectCode}</td>
                      <td style={{ padding: '8px', fontSize: '30px' }}>{result.subjectName}</td>
                      <td style={{ padding: '8px', fontSize: '30px' }}>{result.grade}</td>
                      <td style={{ padding: '8px', fontSize: '30px' }}>{result.credit}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ))}
          </div>
        ))}
        {/* Cumulative Performance Index (CPI) Table */}
        <h2>Cumulative Performance Index (CPI)</h2>
        <table style={{ borderCollapse: 'collapse', width: '100%' }}>
          <thead>
            <tr>
              <th style={{ border: '1px solid #000', padding: '8px', textAlign: 'left', fontSize: '30px' }}>Semester</th>
              <th style={{ border: '1px solid #000', padding: '8px', textAlign: 'left', fontSize: '30px' }}>SPI</th>
              <th style={{ border: '1px solid #000', padding: '8px', textAlign: 'left', fontSize: '30px' }}>CPI</th>
            </tr>
          </thead>
          <tbody>
            {studentResults.map((semester, index) => (
              <tr key={index}>
                <td style={{ border: '1px solid #000', padding: '8px', fontSize: '30px' }}>Semester {semester.semester}</td>
                <td style={{ border: '1px solid #000', padding: '8px', fontSize: '30px' }}>{calculateCPI(semester.results)}</td>
                <td style={{ border: '1px solid #000', padding: '8px', fontSize: '30px' }}>{calculateFinalCPI(index+1)}</td>
              </tr>
            ))}
          </tbody>
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
  
  


const App2 = () => {
  return (
    <Container>
      <Button onClick={downloadPdf}>Download PDF</Button>
      <div id="container">
        <div style={{textAlign:'center', display:'flex', justifyContent:'center'}}>
          <img style={{width:'100px', height:'100px'}} src={iiitg_long}></img>
          <div>
          <h1>INDIAN INSTITUTE OF INFORMATION AND TECHNOLOGY</h1>
          <h2>Bachelor of Technology Grade Card (Semester I to VII)</h2>
          </div>
          
        </div>
        
        
        <StudentResults2 Results={Results} />
      </div>
    </Container>
  );
};

export default App2;
