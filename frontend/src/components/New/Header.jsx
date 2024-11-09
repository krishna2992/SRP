import React, { useEffect } from 'react';
import './Header.css'
import { Link } from 'react-router-dom';
import icon from '../../Assets/long-iiitg.png'
import { useSelector } from 'react-redux';
import { useState } from 'react';
const Header = () => {

    const User = useSelector((state)=> (state.authReducer)).data;
    const onLogout = () =>{
        localStorage.clear();   
        console.log('Logging out......');
        window.location='/';
    }
        
    const [menuVisible, setMenuVisible] = useState(false);

    const toggleMenu = () => {
      setMenuVisible(!menuVisible);
    };
      
    
  return (
    
    <div className='header-main-container'>
        <div className='logo-div'>
            <img src={icon} alt='Logo' style={{height:'80px', width:'400px'}}/>
        </div>
        <div className='links-div'>
            <div className='link-div-box'>
                <Link to='/student/home'>Home</Link>
                {/* {!User.isInitialChoosed && (<Link  to='/student/elective/choice'>Initial Choice</Link>)} */}
                <Link to='/student/electives'>Electives</Link>
                <Link to='/student/result'>Result</Link>
                <Link to='/student/acad'>Office</Link>
                
            </div>
        </div>
        <div className='auth-div'>
            <button onClick={onLogout}>LOG OUT</button>
        </div>
    </div>
  );
};

export default Header;
