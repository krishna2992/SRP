import React, { useEffect, useRef } from 'react';
import html2pdf from 'html2pdf.js';
import './Print_PDF.css'

const studentResults = [
  {
    semester: 1,
    results: [
      { subjectCode: 'ENG101', subjectName: 'English', grade: 'A', credit: 3 },
      { subjectCode: 'MAT101', subjectName: 'Mathematics', grade: 'B', credit: 4 },
      { subjectCode: 'PHY101', subjectName: 'Physics', grade: 'B+', credit: 3 }
    ]
  },
  {
    semester: 2,
    results: [
      { subjectCode: 'ENG201', subjectName: 'Advanced English', grade: 'A-', credit: 3 },
      { subjectCode: 'MAT201', subjectName: 'Advanced Mathematics', grade: 'A', credit: 4 },
      { subjectCode: 'CHEM201', subjectName: 'Chemistry', grade: 'B', credit: 3 }
    ]
  },
  {
    semester: 3,
    results: [
      { subjectCode: 'ENG301', subjectName: 'Literature', grade: 'A', credit: 3 },
      { subjectCode: 'PHY301', subjectName: 'Advanced Physics', grade: 'A', credit: 4 },
      { subjectCode: 'BIO301', subjectName: 'Biology', grade: 'B+', credit: 3 }
    ]
  },
  {
    semester: 4,
    results: [
      { subjectCode: 'ENG401', subjectName: 'Shakespeare', grade: 'A+', credit: 3 },
      { subjectCode: 'MAT401', subjectName: 'Calculus', grade: 'A', credit: 4 },
      { subjectCode: 'CHEM401', subjectName: 'Organic Chemistry', grade: 'B', credit: 3 }
    ]
  },
  // Add more semesters and subjects as needed
];

function calculateGPA(results) {
  let totalCredits = 0;
  let totalGradePoints = 0;

  results.forEach(subject => {
    const gradePoint = calculateGradePoint(subject.grade);
    totalGradePoints += gradePoint * subject.credit;
    totalCredits += subject.credit;
  });

  return totalGradePoints / totalCredits;
}

function calculateGradePoint(grade) {
  switch (grade) {
    case 'A':
      return 4;
    case 'A-':
      return 3.7;
    case 'B+':
      return 3.3;
    case 'B':
      return 3;
    // Add more grades if needed
    default:
      return 0;
  }
}

function App() {
  const contentRef = useRef(null);

  useEffect(() => {
    const content = contentRef.current;

    if (!content) {
      return;
    }

    const opt = {
      margin:       1,
      filename:     'student_results.pdf',
      image:        { type: 'jpeg', quality: 0.98 },
      html2canvas:  { scale: 2 },
      jsPDF:        { unit: 'in', format: 'a4', orientation: 'portrait' } // Adjust format and orientation as needed
    };

    html2pdf().from(content).set(opt).save();
  }, []);

  return (
    <div ref={contentRef} style={{ display: 'none' }}>
      <h2>Student Results</h2>
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        {studentResults.map((semester, index) => (
          <div key={index}>
            <h3>Semester {semester.semester}</h3>
            <table className="print_table">
              <thead>
                <tr>
                  <th className="print_th">Subject Code</th>
                  <th className="print_th">Subject Name</th>
                  <th className="print_th">Grade</th>
                  <th className="print_th">Credit</th>
                </tr>
              </thead>
              <tbody>
                {semester.results.map((result, i) => (
                  <tr key={i}>
                    <td className="print_td">{result.subjectCode}</td>
                    <td className="print_td">{result.subjectName}</td>
                    <td className="print_td">{result.grade}</td>
                    <td className="print_td">{result.credit}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
