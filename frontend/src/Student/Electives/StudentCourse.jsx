import React, { useEffect } from "react";
import logo from '../../Assets/cs-logo.webp'
import './Elective.css'
import {useSelector} from 'react-redux'
import { Link, useNavigate } from "react-router-dom";

const StudentElectives = () =>{
    const User = useSelector((state)=> state.authReducer).data;
    const navigate = useNavigate();
    useEffect(()=>{
        if(!User)
        {
            navigate('/');
        }
    });
    
    const subjectsd = User?.subjects;
    return (
        <div style={{minHeight:'500px'}}>
        {subjectsd && (
        <div className="grid-container">
            {subjectsd?.map((sub) =>(
                <div key={sub.id} className="grid-item">
                    <Link state={sub} style={{textDecoration:'none'}} to={`/student/course/${sub.id}`}>
                        <div className="course-name">{sub.name}</div>
                        <div className="course-filler">
                            <img src={logo} className="course-filler-img" alt={sub.name}></img>
                        </div>
                    </Link>
              </div>
            ))}
        </div>)}
    
        {subjectsd.length===0 &&(
            <h2 style={{marginLeft:'10%'}}>No Subjects Selected.</h2>
        )}
    </div>
        
    )
}

export default StudentElectives;