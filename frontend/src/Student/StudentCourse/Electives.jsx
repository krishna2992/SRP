import React, { useEffect } from "react";
import Header from "../../components/New/Header";
import StudentElectives from "../Electives/StudentCourse";
import ElectiveSelection from "../ChoiceForm/Choice_Test";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const ElectiveMain = () =>{
    const User = useSelector((state)=> state.authReducer)?.data;
    const navigate = useNavigate();
    useEffect(()=>{
        if(!User)
        {
            navigate('/');
        }
        if(User?.type !== 'student')
        {
            navigate('/');
        }
    });
    
    
    return (
        <div>
            <Header/>
            {!User?.isElectivesChoosed && <ElectiveSelection/>}
            {User?.isElectivesApproved && (<StudentElectives/>)}
            {User?.isElectivesChoosed && !User?.isElectivesApproved && (
                <div style={{marginLeft:'10%', minHeight:'500px'}}>
                    <h2>Electives Choosed</h2>
                </div>
            )}
        </div>
    )
};

export default ElectiveMain;