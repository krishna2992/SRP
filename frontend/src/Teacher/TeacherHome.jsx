import React from "react";
import TeacherHeader from "../components/New/TeacherHeader";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import './TeacherHome.css'
const TeacherHome = () =>{
    const User = useSelector((state)=>state.authReducer).data;
    const navigate = useNavigate();
    if(!User)
    {
        navigate('/');
    }
    return(
        <div>
            <TeacherHeader/>
            <div className="teacherhome-main-container">
                <div className="teacher-box">
                    <h2>{User?.name}</h2>
                    <h4>{User?.post}</h4>
                </div>
            </div>
        </div>
    )
}

export default TeacherHome;