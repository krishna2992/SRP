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


export const getSubjectPosts = async(subject_id)  =>{
    try{
        
        const {data} = await api.getPosts(subject_id);
        return {stat:'C200', 'data':data}
        
    }
    catch(error){
        console.log(error)
        if(error?.response?.status === 401)
        {
            await handleTokenExpiration();
            return await getSubjectPosts(subject_id);
        }
        return {stat:'C400', msg:'Failed To Fetch Posts'}
    }
}

export  const submitPosts = async(sub_id, postData) =>{

    try{
        const {data} = api.submitPost(sub_id, postData);
        return {stat:'C200', data:data}
    }
    catch(error){
        console.log(error)
        if(error?.response?.status === 401)
        {
            await handleTokenExpiration();
            return await submitPosts(sub_id, postData);
        }
        return {stat:'C200', msg:'Failed To Submit Posts'}
    }
}

export const deletePost = async (postId) =>{
    try{
        const {data} = await api.deletePost(postId);
        return {stat:'C200'};
    }
    catch(error)
    {
        console.log(error)
        if(error?.response?.status === 401)
        {
            await handleTokenExpiration();
            return await deletePost(postId);
        }
        return {stat:'C400', msg:'Failed To Delete Posts'}
    }
}