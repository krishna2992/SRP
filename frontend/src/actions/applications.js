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

export const submitLeave = async (userData) =>{
    try{
        const {data} = await api.submitLeave(userData);
        return {stat:'C200', msg:'Success'};
    }
    catch(err)
    {
        console.log('error occured');
        console.log(err) 
        if(err?.response?.status === 401)
        {
            await handleTokenExpiration();
            return await submitLeave(userData);
        }
        return {stat:'C400', msg:'Failed To Submit Leave'};

    }
}


export const changeStatus = async (id, newStatus) => {
    try {
      const response = await api.changeStatus(id, {status:newStatus});
      return response.data;
    } catch (err) {
        console.log('error occured');
        console.log(err) 
        if(err?.response?.status === 401)
        {
            await handleTokenExpiration();
            return await changeStatus(id, newStatus);
        }
        throw err;
    }
  };

  export const changeBonafideStatus = async (id, newStatus) => {
    try {
        
      const response = await api.changeBonafideStatus(id, {'status':newStatus});
      return response.data;
    } catch (err) {
        console.log('error occured');
        console.log(err) 
        if(err?.response?.status === 401)
        {
            await handleTokenExpiration();
            return await changeBonafideStatus(id, newStatus);
        }
        throw err;
    }
  };


  export const submitBonafideApplication = async (userData) => {
    try {
      const response = await api.submitBonafideApplication(userData);
      return response.data; // Assuming the server responds with the newly created bonafide application data
    } catch (err) {
        console.log('error occured');
        console.log(err) 
        if(err?.response?.status === 401)
        {
            await handleTokenExpiration();
            return await submitBonafideApplication(userData);
        }
        throw err;
    }
  };

  export const getBonafideApplications = async (statusFilter) => {
    try {
      const response = await api.getBonafideApplications(statusFilter);
    //   console.group(response)
      return response; // Assuming the server responds with the bonafide applications data
    } catch (err) {
        console.log('error occured');
        console.log(err) 
        if(err?.response?.status === 401)
        {
            await handleTokenExpiration();
            return await getBonafideApplications(statusFilter);
        }
        throw err;
    }
  };

  export const getLeaveApplications = async (statusFilter) => {
    try {
      const response = await api.getLeaveApplications(statusFilter);
    //   console.group(response)
      return response; // Assuming the server responds with the bonafide applications data
    } catch (err) {
        console.log('error occured');
        console.log(err) 
        if(err?.response?.status === 401)
        {
            await handleTokenExpiration();
            return await getLeaveApplications(statusFilter);
        }
        throw err;
    }
  };