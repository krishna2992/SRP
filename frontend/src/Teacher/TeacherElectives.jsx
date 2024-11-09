import React from "react";
import logo from '../Assets/cs-logo.webp'
import '../Student/Electives/Elective.css'
import TeacherHeader from "../components/New/TeacherHeader";
import { useSelector } from 'react-redux';
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
const TeacherElectives = () =>{
    const User= useSelector((state)=>state.authReducer).data;
    const navigate = useNavigate();
    if(User){
        if(!User?.type){
            navigate('/');
        }
        else if(User?.type !== 'teacher')
        {
            navigate('/');
        }
    }
    
    return (
        <div>
            <TeacherHeader/>
        <div className="grid-container">
            {User?.subjects?.map((sub, index) =>(
                <div key={index} className="grid-item">
                    <Link  state={sub} style={{textDecoration:'none'}} to={`/teacher/course/${sub?.code}`}>
                        <div className="course-name">{sub.name}</div>
                        <div className="course-filler">
                            <img src={logo} className="course-filler-img" alt={sub.name}></img>
                        </div>
                    </Link>
              </div>
            ))}
    </div>
    </div>
        
    )
}

export default TeacherElectives;