import * as api from '../api'
import axios from 'axios';

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

export const getResults = async () =>  {
    try{
        const {data} = await api.getResults(localStorage.getItem("UID"));
        return data;
    }
    catch(error){
        if(error?.response?.status === 401)
        {
            await handleTokenExpiration();
            return await getResults();
        }
        return [];
    }
    
}