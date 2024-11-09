import React, { useEffect, useState } from "react";
import { getResults } from "../../actions/results";
import Header from "../../components/New/Header";
import './Result.css';
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";



const Result = () =>{
    const [studentMarks, setStudentMarks] = useState([]);
    const navigate = useNavigate();
    const User = useSelector((state)=> state.authReducer).data;
    // const delay = async (ms) => {
    //     return new Promise((resolve) => 
    //         setTimeout(resolve, ms));
    // };
    const getStudentResults = async ()=>{
        await getResults().then((res) => setStudentMarks(res));
    }

    useEffect(()=>{
        if(!User)
        {
            navigate('/');
        }
        getStudentResults();
    },[])

    const semesters = [...new Set(studentMarks?.map(mark => mark.sem))];
    return(
        <div>
            <Header/>
        <div style={{minHeight:'500px', margin:'20px'}}>
        {semesters?.length>0 &&(
        <div>
        <div>
          <button >Download Pdf</button>
        </div>
        <div id='divToPrint' className='grade-main-container' style={{display:'flex', flexWrap:'wrap', justifyContent:'space-evenly'}}>
            {semesters?.map((sem, index) => (
                <div key={index} style={{width:'40%'}}>
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
                        {studentMarks
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
            
        )}
        </div>
        </div>
    )
}

export default Result