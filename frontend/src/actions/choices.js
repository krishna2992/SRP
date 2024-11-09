import * as api from '../api'
import axios from 'axios'
// import { dispatchUser } from './auth';
import { ErrorHandler } from './errorhandler';

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


export const initialChoice = async (userData) =>{
    try{
        const {data} = await api.initialChoiceSubmit(userData);
        return {'stat':'C200', 'data':data}; 
    }
    catch(err)
    {
        const networkError = ErrorHandler(err);
        if(networkError !== '')
        {
            return networkError;
        }
        console.log(err)
        if(err?.response?.status === 401)
        {
            await handleTokenExpiration();
            return await initialChoice(userData);
        }
        return [];
    }
}


export const getOptionSubjects = async (userData)=>{
    try{
        const {data} = await api.getOptionSubjects(userData);
        return {stat:'C200', data:data};

    }
    catch(err){
        
        const networkError = ErrorHandler(err);
        if(networkError !== 1)
        {
            return {stat:'C400', msg:'Network Error'};
        }
        else if(err?.response?.status === 401)
        {
            await handleTokenExpiration();
            return await getOptionSubjects(userData);
        }
        return {stat:'C400', msg:'Failed To Fetch Subject'}
    }
}

export const getStudentBacklogs = async (pk)=>{
    try{
        const {data} = await api.getBacklogs(pk);
        return {stat:'C200', 'data':data};
    }
    catch(err)
    {
        console.log(err) 
        if(err?.response?.status === 401)
        {
            await handleTokenExpiration();
            return await getStudentBacklogs(pk);
        }
        return {stat:'C400', msg:'Failed To Fetch Backlogs.'}
    }
}


export const submitElectives =  (pk, userData) => async (dispatch) =>{
    try{
        const {data} = await api.submitStudentElectives(pk, userData);
        console.log(data);
        localStorage.setItem('NEw_User', JSON.stringify(data));
        dispatch({type:"USER_DATA", payload:data});
        return {stat:'C200', data:data} ;
    }
    catch(err){
        console.log(err) 
        if(err?.response?.status === 401)
        {
            await handleTokenExpiration();
            return await dispatch(submitElectives(pk, userData));
        }
        return {stat:'C400', msg:'Failed To Submit Electives.'}
    }
}