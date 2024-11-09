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


export const getUnverifiedStudents = async () =>{
    try{
        const {data} = await api.getUnverifiedStudents();
        return data;
    }
    catch(error)
    {
        console.log(error)
        if(error?.response?.status === 401)
        {
            await handleTokenExpiration();
            return await getUnverifiedStudents();
        }
        return []
    }

}

export const signStudent = async (teacher_id, student_id)=>{
    try{
        const {data} = await api.signStudent({'teacher':teacher_id, 'student':student_id});
        return {msg:'Success', stat:'C200'};
    }
    catch(error)
    {
        console.log(error)
        if(error?.response?.status === 401)
        {
            await handleTokenExpiration();
            return await signStudent(teacher_id, student_id);
        }
        return {msg:'Failed To Sign Student', stat:'C400'};
    }
}

export const makeRefillChoices = async (teacher_id, student_id) =>{
    try{
        const {data} = await api.signStudent({'teacher':teacher_id, 'student':student_id, 'refill':true});
        return {msg:'Success', stat:'C200'};
    }
    catch(error)
    {
        console.log(error)
        if(error?.response?.status === 401)
        {
            await handleTokenExpiration();
            return await makeRefillChoices(teacher_id, student_id);
        }
        return {msg:'Failed To make refill Student', stat:'C400'};
    }
}

export const getElectiveStudent = async (userData) =>{
    try{
        const res = await api.postStudentsElecties(userData);
        return {'stat':'C200', 'data':res.data};
    }
    catch(error){
        console.log(error);
        if(error?.response?.status === 401)
        {
            await handleTokenExpiration();
            return await getElectiveStudent(userData);
        }
        return {msg:'Failed To Get Student', stat:'C400'};
    }
}


export const distributeElectives = async (studentData) =>{
    try{
        const {data} = await api.distibuteElectives(studentData);
        return {'stat':'C200', 'data':data}
    }
    catch(error)
    {
        console.log(error);
        if(error?.response?.status === 401)
        {
            await handleTokenExpiration();
            return await distributeElectives(studentData);
        }
        return {msg:'Failed To Submit Students', stat:'C400'};
    }
}