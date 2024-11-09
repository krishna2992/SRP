import React, {useEffect, useState} from "react";
import './Verification.css'
import student from '../../Assets/student.png'
import search from '../../Assets/search-icon.png'
import TeacherHeader from "../../components/New/TeacherHeader";
import { Link } from "react-router-dom";
import { getPaidStudents } from "../../actions/finance";
const Verification = () =>{
    const [searchTerm, setSearchTerm] = useState('');

    const [studentList, setStudentList] = useState([]);
    const oroginal =[
        {
            name: 'Krishna Suryawanshi',
            roll: 2001196,
        },
        {
            name: 'Abc Defgh',
            roll: '2001196',
        },
        {
            name: 'Krishna Suryawanshi',
            roll: 2001196,
        },
        {
            name: 'Abc Defgh',
            roll: '2001196',
        },
    ]
    var students = oroginal;
    
    const matchStudent = (stu) =>{
        return stu.name.match(searchTerm);
    }

    const getAllPaidStudents = async() =>{
        const res = await getPaidStudents();
        if(res.stat === 'C200')
        {
            setStudentList(res.data);
        }
    }

    useEffect(()=>{
        getAllPaidStudents();
        console.log(studentList);
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
            {studentList.length>0 && (
                <div className="students-list">
                {studentList.filter(matchStudent).map((stu, index)=>(
                    <div key={index}  className="verify-student-div">
                        <Link style={{textDecoration:'none'}} to={`/acad/verify/student/${stu.id}`}>
                            <div style={{display:'flex'}} className="student-box-div">
                                <div className="student-icon-div">
                                    <img style={{height:'150px'}} src={student} alt="Student-Icon"/>
                                </div>
                                <div  className="students-div-info">
                                    <h3>{stu.name}</h3>
                                    <p>{stu.roll}</p>
                                    <p>Rs. {stu.amountPaid}</p>
                                </div>
                            </div>
                        </Link>
                    </div>
                ))} 
                </div>
            )}
        </div>
        </div>
    )
}

export default Verification;