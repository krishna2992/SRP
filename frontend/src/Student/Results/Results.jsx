import React from 'react';
import './Result.css'
import Header from '../../components/New/Header';
import html2canvas from 'html2canvas';
import  {jsPDF } from "jspdf";


class StudentMarksTable extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      studentMarks: [
        { name: 'Mathematics', code: 'MATH101', sem: 1, grade: 'A' },
        { name: 'Physics', code: 'PHY101', sem: 1, grade: 'B' },
        { name: 'Chemistry', code: 'CHEM101', sem: 1, grade: 'A' },
        { name: 'Biology', code: 'BIO101', sem: 2, grade: 'A-' },
        { name: 'History', code: 'HIST101', sem: 2, grade: 'B+' },
        { name: 'Geography', code: 'GEOG101', sem: 2, grade: 'A' },
      ]
    };
  }
  onClick() {
    


}

  onclick_fun() {
    console.log('Hello World')
    const input = document.getElementById('divToPrint');
    console.log(input)
    html2canvas(input).then((canvas) =>{
        const imgData = canvas.toDataURL('image/png');
        const pdf = new jsPDF();
        pdf.addImage(imgData, 'JPEG', 0, 0);
        pdf.save("download.pdf");
    })
  }

  render() {
    const semesters = [...new Set(this.state.studentMarks.map(mark => mark.sem))];

    return (
    <div>
        <Header/>
        <div>
          <button onClick={this.onclick_fun}>Download Pdf</button>
        </div>
      <div id='divToPrint' className='grade-main-container' style={{display:'flex', flexWrap:'wrap'}}>
        {semesters.map((sem, index) => (
          <div key={index} style={{width:'250px', padding:'20px'}}>
            <h2>Student Grades for Semester {sem}</h2>
            <table className='table-class'>
              <thead>
                <tr>
                  <th className='table-th-tr table-header-th'>Subject Name</th>
                  <th className='table-th-tr table-header-th'>Subject Code</th>
                  <th className='table-th-tr table-header-th'>Grade</th>
                </tr>
              </thead>
              <tbody>
                {this.state.studentMarks
                  .filter(mark => mark.sem === sem)
                  .map((mark, index) => (
                    <tr key={index}>
                      <td className='table-th-tr'>{mark.name}</td>
                      <td className='table-th-tr'>{mark.code}</td>
                      <td className='table-th-tr'>{mark.grade}</td>
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
}

export default StudentMarksTable;
