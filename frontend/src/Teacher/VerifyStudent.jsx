import React, { useState } from "react";
import '../AcadOffice/Verification/Verification.css'
import student from '../Assets/student.png'
import search from '../Assets/search-icon.png'
import { Link} from "react-router-dom";
import { useEffect } from "react";
import { getUnverifiedStudents } from "../actions/verification";
import TeacherHeader from "../components/New/TeacherHeader";

const VerifyStudentElectives = () =>{
    const [searchTerm, setSearchTerm] = useState('');
    const [students,setStudents] = useState();
    
    
    const matchStudent = (stu) =>{
        return stu?.name?.toLowerCase().match(searchTerm.toLowerCase());
    }
    const getStudents = async ()=>{
        const data = await getUnverifiedStudents();
        setStudents(data);
    }

    useEffect(()=>{
        getStudents();
    }, [])

    return (
        <div>
            <TeacherHeader/>
        <div style={{minHeight:'500px'}} className="verify-main-container">
            <div className="verify-main-container-header">
                <h2>Student</h2>
                <div className="verify-header-search-box">
                    <input onChange={e => setSearchTerm(e.target.value)} placeholder="Search for Students" type="text"/>
                    <span><button><img src={search} alt="search"/></button></span>
                </div>
            </div>
            {students? (
                <div className="students-list">
                {students?.filter(matchStudent).map((stu, index)=>(
                    <div key={index}  className="verify-student-div">
                        <Link style={{textDecoration:'none'}} state={stu} to={`/teacher/verify/student/${stu.roll}`}>
                            <div style={{display:'flex'}} className="student-box-div">
                                <div className="student-icon-div">
                                    <img style={{height:'150px'}} src={student} alt="Student-Icon"/>
                                </div>
                                <div  className="students-div-info">
                                    <h3>{stu?.name}</h3>
                                    <p>{stu?.roll_number}</p>

                                </div>
                            </div>
                        </Link>
                    </div>
                ))} 
                </div>
            ):(<p>No Students Available</p>)}
        </div>
        </div>
    )
}

export default VerifyStudentElectives