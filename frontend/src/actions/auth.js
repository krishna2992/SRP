import axios from 'axios';
import * as api from '../api'

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


export const loginUser =  (userData, navigate) => async (dispatch) =>{
    try {
        
        const {data} = await axios.post('http://localhost:8000/user/login', userData);
        const serialized = JSON.parse(data);
        localStorage.setItem('Refresh', JSON.stringify(serialized['token']['refresh'].replace(/^["'](.+(?=["']$))["']$/, '$1')));
        localStorage.setItem('Access', JSON.stringify(serialized['token']['access'].replace(/^["'](.+(?=["']$))["']$/, '$1')));
        localStorage.setItem('User', JSON.stringify(serialized['user']));
        localStorage.setItem('UID', JSON.stringify(serialized['user']['id']));
        const type  = serialized['user']['type'].replace(/^["'](.+(?=["']$))["']$/, '$1');
        localStorage.setItem('Subjects', JSON.stringify(serialized['user']['subjects']))
        dispatch(dispatchUser());
        navigate(`/${type}/home`);
        return {msg:'Login Success', code:'C200'}
    } catch (error) {
        console.log(error);
        return {code:error.response?.status, msg:'Wrong username or password'};
    }
}

export const updatePersonal = (pk, userData)=> async (dispatch) =>{
    try{
        
        const {data} = await api.personalUpdate(pk, userData);
        localStorage.setItem('User',JSON.stringify(data));
        dispatch(dispatchUser());
        return {stat:'C200', msg:'Success'};
    }
    catch(error)
    {
        console.log(error)
        if(error?.response?.status === 401)
        {
            await handleTokenExpiration();
            return await (dispatch(updatePersonal(userData)));
        }
        return {stat:'C400', data:'Failed To Update'};
    }
}

export const dispatchUser =  () => async (dispatch) =>{
    const data  = JSON.parse(localStorage.getItem('User'))
    dispatch({type:"USER_DATA", payload:data});
}

export const dispatchSubjects = ()=> async (dispatch) =>{
    const {data} = JSON.parse(localStorage.getItem('Subjects'))
    dispatch({type:"USER_SUBJECTS", payload:data})
}


export const chagePassword = (userData)=> async (dispatch)  =>{
    try{
        const {data} = await api.changePassword(userData);
        dispatch(loginUser);
        return
    }catch(error)
    {
        console.log(error)
        if(error?.response?.status === 401)
        {
            await handleTokenExpiration();
            return await (dispatch(chagePassword(userData)));
        }
        return {stat:'C400', data:'Failed To Update Password'};
    }
} 
