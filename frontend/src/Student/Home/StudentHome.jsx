import React, { useEffect, useState } from 'react';
import './StudentHome.css'
import Header from '../../components/New/Header'
import { useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux';
import { updatePersonal } from '../../actions/auth';
import { FaCheckCircle, FaTimesCircle } from 'react-icons/fa';

const Home =  () => {
    const [personalEdit, setPersonalEdit] = useState(false)
    const navigate = useNavigate();
    const User = useSelector((state)=> (state.authReducer)).data;
    const dispatch = useDispatch();
    
    const handlePersonal= ()=>{
        setPersonalEdit(true);
    }

    const handleSubmit = async () => {
        const updatedUserInfo = {
            contact: document.getElementById('contact').value,
            alter_email: document.getElementById('alter-email').value,
            city: document.getElementById('city').value,
            state: document.getElementById('state').value,
            addr_line: document.getElementById('addr1').value,
            pincode: document.getElementById('pincode').value
        };

        Object.keys(updatedUserInfo).forEach(key => {
            if (updatedUserInfo[key] === null || updatedUserInfo[key] === '') {
                delete updatedUserInfo[key];
            }
        });

        if (Object.keys(updatedUserInfo).length > 0) {
            const res = await dispatch(updatePersonal(User?.id, updatedUserInfo));
            if(res.stat !== 'C200')
            {
                alert('Failed to Update Personal Info');
            }
            setPersonalEdit(false);
        }
        
    };

    const getBranch = (branch) =>{
        if(branch === 'cse'){
            return 'Computer Science and Engineering'
        }
        else if(branch === 'ece')
        {
            return 'Electronic and Communication Engineering'
        }
        else{
            return branch.toUpperCase()
        }
    }

    const getDegree = (degree) =>{
        if(degree === 'btech')
        {
            return 'Bachlore of Technology'
        }
        else if(degree ==='mtech')
        {
            return 'Masters of Technology'
        }
        else{
            return degree.toUpperCase();
        }
    }


    const handleCancel =  () =>{
        setPersonalEdit(false);
    }

    useEffect(()=>{
        if(!User){
            navigate('/');
        }
        if(User?.type !== 'student')
        {
            navigate('/');
        }
    })
    
    return(
        <div>
            <Header/>
        {User &&
    <div   className='home-main-container'>
        <div style={{fontSize:'larger'}}>
            <main>
                
                <section className='home-section' id='academic'>
                    <header>
                        <h2>Academic Information</h2>
                    </header>
                    <div className='section-div'>
                        <div>
                            <label htmlFor='name'>Name</label>
                            <p id='name'>{User?.name}</p>
                        </div>
                        <div>
                            <label htmlFor='branch'>Roll No</label>
                            <p>{User?.roll}</p>
                        </div>
                    </div>
                    <div className='section-div' >
                        <div >
                            <label htmlFor='course'>Course</label>
                            <p id='course'>{getDegree(User?.course)}</p>
                        </div>
                        <div>
                            <label htmlFor='branch'>Branch</label>
                            <p>{getBranch(User?.branch)}</p>
                        </div>
                    </div>
                    <div className='section-div'>
                        <div >
                            <label>semester</label>
                            <p >{User?.sem}</p>
                        </div>
                        <div>
                        <label htmlFor='email'> Email</label>
                            <p>{User?.email}</p>
                        </div>
                    </div>
                    <div className='section-div'>
                        <div>
                            <label>Payment Status</label>
                            {User?.isPaid ? (
                                <p style={{ color: 'green' }}>
                                    <FaCheckCircle /> Payment Complete
                                </p> ) : (
                                <p style={{ color: 'red' }}>
                                    <FaTimesCircle /> Payment Incomplete
                                </p>
                            )}
                        </div>
                        <div>
                            <label > Registration Status</label>
                            {User?.isRegistred?(<p style={{ color: 'green' }}>
                                    <FaCheckCircle /> Payment Complete
                                </p> ) : (
                                <p style={{ color: 'red' }}>
                                    <FaTimesCircle /> Registration Incomplete
                                </p>
                            )}
                        </div>
                    </div>
                </section>
                
                <section className='home-section' id='personal'>

                    <header>
                        <h2>Personal Information</h2>
                    </header>

                    <div className='section-div'>

                        <div>
                            <label htmlFor='contact'>Contact</label>
                            {personalEdit?<p><input className='student-home-input' defaultValue={User?.contact?`${User?.contact}` : ''} id='contact' autoFocus type='text'/></p>:<p id='contact'>{User?.contact?`${User?.contact}` : 'Not Available'}</p>}
                        </div>


                        <div>
                            <label htmlFor='alter-email'> Alternae Email</label>
                            {personalEdit?<p><input  className='student-home-input' defaultValue={User?.alter_email?`${User?.alter_email}`:'Not Available'} type='email' id='alter-email'/></p>:<p>{User?.alter_email?`${User?.alter_email}`:'Not Available'}</p>}
                        </div>
                    </div>
                    <div className='section-div'>
                        <div >
                            <label htmlFor='city'>City</label>
                            {personalEdit?<p><input className='student-home-input' defaultValue={User?.city?`${User?.city}`:''} id='city' type='text'></input></p>:<p id='pincode'>{User?.city?User?.city:'Not Available'}</p>}
                        </div>
                        <div >
                            <label htmlFor='state'>State</label>
                            {personalEdit?<p><input  className='student-home-input' defaultValue={User?.state?`${User?.state}`:''} id='state' type='text'/></p>:<p id='state'>{User?.state?User?.state:'Not Available'}</p>}
                        </div>
                    </div>
                    <div className='section-div'>
                        <div >
                        <label htmlFor='addr1'>Address Line 1</label>
                            {personalEdit?<p ><input className='student-home-input' defaultValue={User?.addr_line?`${User?.addr_line}`:''} id='addr1' type='text'/></p>:<p id='pincode'>{User?.addr_line?`${User?.addr_line}`:'Not Available'}</p>}
                        </div>
                        <div >
                        <label htmlFor='pincode'>Pincode</label>
                            {personalEdit?<p><input className='student-home-input' defaultValue={User?.city?`${User?.pincode}`:''} id='pincode' type='text'/></p>:<p id='pincode'>{User?.pincode?`${User?.pincode}`:"Not Available"}</p>}
                        </div>
                    </div>
                    <div className='section-div'>
                        <div >
                            
                        </div>
                        <div >
                        {!personalEdit?<button onClick={handlePersonal} className='personal-information-button'>Edit</button>:
                            <div style={{display:'flex', justifyContent:'center'}}>
                                <div>
                                    <button style={{marginRight:'50px'}} onClick={handleCancel} className='personal-information-button'>Cancel</button>
                                </div>
                                <div>
                                    <button onClick={handleSubmit} className='personal-information-button'>Submit</button>
                                </div>
                                
                            </div>}
                        </div>
                    </div>
                </section>
            </main>
        </div>
        
    </div>}
    </div>
    )
}

export default Home;