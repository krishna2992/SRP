import * as api from '../api'
import axios from 'axios'

const handleTokenExpiration = async ()=>{
    try{
        const refreshToken = localStorage.getItem('Refresh').replace(/^["'](.+(?=["']$))["']$/, '$1');
        const {data} = await axios.post('http://localhost:8000/user/token/refresh',{"refresh":refreshToken});  
        localStorage.setItem('Access', JSON.stringify(data['access'].replace(/^["'](.+(?=["']$))["']$/, '$1')));
    }
    catch(err){
        console.log('Token Refreh Error');
        localStorage.clear()
        window.location='/';
    }
}

export const getAllPayments = async (uid)  => {
    try{
        const {data} = await api.getPayments(uid);
        // localStorage.setItem('Payments', JSON.stringify(data)); 
        return {stat:'C200', data:data};
    }
    catch(err){
        console.log('error occured');
        console.log(err) 
        if(err?.response?.status === 401)
        {
            await handleTokenExpiration();
            return await getAllPayments();
        }
        return [];
    }
}

export const submitPayment = async (student_id, paymentData ) =>   {
    try{
        const {data} = await api.submitPayment(student_id, paymentData);
        // dispatch(getAllPayments(student_id));
        console.log(data);
        return {msg:'Success', stat:'C200'};
    }
    catch (err) {
        console.log('error occured');
        console.log(err) 
        if(err?.response?.status === 401)
        {
            await handleTokenExpiration();
            return await submitPayment(student_id, paymentData);
        }
        return {msg:'Failed', stat:'C400'}
    }
}


export const getPaidStudents = async () =>{
    try{
        const {data} = await api.getPaidStudents();
        return {stat:'C200', data:data};
    }
    catch(err)
    {
        console.log('error occured');
        console.log(err) 
        if(err?.response?.status === 401)
        {
            await handleTokenExpiration();
            return await getPaidStudents();
        }
        return {stat:'C400', 'msg':'Failed To fetch students'};
    }
}


export const verifyStudentPayments = async (stu_id) =>{
    try{
        const {data} =await api.signStudentFinance(stu_id);
        return {stat:'C200', msg:'Succesfully Signed Student'};
    }
    catch(err){
        console.log('error occured');
        console.log(err) 
        if(err?.response?.status === 401)
        {
            await handleTokenExpiration();
            return await verifyStudentPayments(stu_id);
        }
        return {stat:'C400', msg:'Failed To Verify Stdent'};
    }
}