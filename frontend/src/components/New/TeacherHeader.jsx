import React from 'react';
import { Link} from 'react-router-dom';
import './Header.css'
import icon from '../../Assets/long-iiitg.png'
import { useSelector } from 'react-redux';

const TeacherHeader = () => {
    const User = useSelector((state)=> (state.authReducer)).data;
    const onLogout = () =>{
        console.log('Logging out.....');
        localStorage.clear();
        window.location='/';
    }
  return (
    <div>
    <div className='header-main-container'>
        <div className='logo-div'>
            <img src={icon} alt='Logo' style={{height:'80px', width:'400px'}}/>
        </div>
        <div className='links-div'>
            <div className='link-div-box'>
                <Link to='/teacher/home'>Home</Link>
                <Link to='/teacher/verify/student'>Electives</Link>
                <Link to='/acad/verify/students'>Payments</Link>
                <Link to='/acad/leave'>Leave</Link>
                <Link to='/acad/bonafide'>Bonafide Applications</Link>
                
            </div>
        </div>
        <div className='auth-div'>
            <button onClick={onLogout}>LOG OUT</button>
        </div>
    </div>
    </div>
  );
};

export default TeacherHeader;
