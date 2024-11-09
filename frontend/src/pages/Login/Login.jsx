import React, {useEffect, useState} from 'react';
import { useNavigate } from 'react-router-dom';
import long_iiitg from '../../Assets/long-iiitg.png'
import './Login.css'; 
import login from '../../Assets/login.png'
import { loginUser } from '../../actions/auth';
import {useDispatch, useSelector} from 'react-redux';



const LoginPage = () => {

  const [userEmail, setUSerEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const User = useSelector((state)=> state.authReducer).data;

  
  const onSubmit = async (e) =>{
    
    e.preventDefault();
    var ele = document.getElementById('error');
    ele.textContent = ''
    if(!userEmail)
    {
      ele.textContent = 'Please Enter valid email address'
      return;
    }
    if(!password)
    {
      ele.textContent = 'Password Should not be empty'
      return;
    }
    
    const error  = await dispatch(loginUser({'username':userEmail, 'password':password}, navigate))
    if(error.code !== 'C200')
    {
      ele.textContent = error.msg;
    }
  }
  
  useEffect(()=>{
    if(User)
    {
      navigate(`/${User?.type}/home`);  
    }
  }, [User, navigate])

  return (
    <div>
      <div style={{display:'flex', justifyContent:'center'}} className='login-header-college'>
        <img  src={long_iiitg} alt='Logo'></img> 
      </div>
      <header style={{marginBottom:'10px'}}>
      </header>
      <div className='main-login-container'>
        <div className='login-container'>
          <div className='login-form-container'>
            <img style={{height:'100px', width:'100px'}} className='login-user-icon' src={login} alt='login'></img>
            <h2 style={{textDecoration:'none'}}>Login to Your Account</h2>
            <span style={{color:'red'}} id="error"></span>
            <form >
              <div className='input-div'>
                <div className='login-input-fields'>
                  <p><input onChange={e => setUSerEmail(e.target.value)} type='text' placeholder='Email'></input> </p>
                </div>
                <div className='login-input-fields'>
                  <p><input  onChange={e => setPassword(e.target.value)} type='password' placeholder='Password'/></p>
                </div>  
              
              </div>
              <div style={{display:'flex', justifyContent:'space-evenly', marginLeft:'10px', paddingBottom:'20px'}}>
                <div  style={{ flex:'1'}}>
                
                </div>
                <div style={{flex:'1'}} > 
                  <a style={{textDecoration:'none', color:'blue'}} href='/forgot/password'>Forget Password</a>
                </div>
              </div>
              <div>
                <button  onClick={onSubmit}> Login</button>
              </div>
          </form>
        </div>
      </div>
    </div>
    </div>
  );
};

export default LoginPage;
