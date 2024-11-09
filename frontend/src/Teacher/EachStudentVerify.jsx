import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import TeacherHeader from "../components/New/TeacherHeader";
import '../Student/Results/Result.css'
import { signStudent, makeRefillChoices } from "../actions/verification";
import { useSelector } from "react-redux";
import './StudentVerify.css'

const VerifyEachStudent = () => {
    const { state } = useLocation();
    const navigate = useNavigate()
    const User = useSelector((state)=> state.authReducer).data;
    
    if(!state){
        navigate('/');
    }

    const onSignStudent = async () =>{
        const data = await signStudent(User?.id, state?.id);
        if(data.stat === 'C200')
        {
            navigate('/teacher/verify/student');
        }
        else{
            alert(data?.msg);
        }
    }

    const makeRefill = async ()=>{
        const data = await makeRefillChoices(User?.id, state?.id);
        if(data.stat === 'C200')
        {
            navigate('/teacher/verify/student');
        }
        else{
            alert(data?.msg);
        }
    }
    
    return(
        <div>
            <TeacherHeader/>
        <div style={{marginLeft:'2%', minHeight:'500px'}} className="per-student-verify-container">
            {state?<div>
                <div>
                    <h2 style={{marginLeft:'10px'}}>{state?.name}</h2>
                    <h3 style={{margin:'10px'}}>{state?.roll}</h3>
                </div>
            <div style={{margin:'10px'}} className="each-student-container">
            <table className='table-class' >
                <thead>
                    <tr >
                    <th className='table-th-tr table-header-th'>Subject Code</th>
                    <th className='table-th-tr table-header-th'>Subject Name</th>
                    <th className='table-th-tr table-header-th'>Semester</th>
                    </tr>
                </thead>
                <tbody>
                {state?.subjects?.map((sub, index)=>(
                    <tr key={index}>
                        <td className='table-th-tr'>{sub.code}</td>
                        <td className='table-th-tr'>{sub.name}</td>
                        <td className='table-th-tr'>{sub.sem}</td>
                    </tr>
                ))}
                </tbody>
                </table>
            </div>
            </div>:<div>No student Available</div>}
            <div className="signature-box">
            <div  style={{marginTop:'50px', fontSize:'25px'}}>
                
                    {/* <p>
                        <input style={{fontSize:'25px',padding: '10px', border:'3px solid black', margin:'0'}}></input>
                        {"    "}<span style={{fontSize:'18px'}}>Enter Your First Name and Last Name as Signature</span>
                    </p> */}
                <button className="verify-student-elective-button" onClick={onSignStudent}  style={{marginRight:'25px',float:'right',width:'150px',fontSize:'20px',padding: '10px', backgroundColor:'#2C3E50', color:'White', marginTop:'10px', borderRadius:'5px'}}>Accept</button>
                <button className="verify-student-elective-button" onClick={makeRefill} style={{marginRight:'25px',float:'right',width:'150px',fontSize:'20px',padding: '10px', backgroundColor:'#2C3E50', color:'White', marginTop:'10px', borderRadius:'5px'}}>Ask to Refill</button>
            </div>
        </div>
        </div>
        
        </div>
    )
}

export default VerifyEachStudent;