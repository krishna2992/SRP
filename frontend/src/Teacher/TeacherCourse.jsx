import React, { useEffect, useState } from "react";
// import {useParams} from 'react-router-dom';
import '../Student/CourseContent/Course.css'
import TeacherHeader from '../components/New/TeacherHeader'
import file from '../Assets/file_icon.png'
import { Link } from "react-router-dom";
import { useLocation} from "react-router-dom";
import { deletePost, getSubjectPosts } from "../actions/posts";
import delete_icon from '../Assets/delete.svg'

const TeacherCourse = () =>{
    const {state} = useLocation();
    const [courseContent, setCourseContent] = useState([])
    const [Error, setError] = useState('');

    const getPosts = async ()=>{
        const data = await getSubjectPosts(state?.id)
        if(data.stat === 'C200')
        {
            setError('');
            setCourseContent(data?.data?.posts);
        }
        else{
            setError('Failed to fetch posts');
        }
    }

    const handleDelete = async (postId)=>{
        const res = await deletePost(postId);
        if(res.stat === 'C200')
        {
            alert('Post Deleted Succesfully');
            setCourseContent(prevContent => prevContent.filter(content => content.id !== postId));
        }
        else{
            alert('Failded To Delete Post');
        }
        
    }

    

    useEffect(()=>{
        getPosts();
    }, [])
    
    return (
        <div>
            <TeacherHeader/>
            <div className="course-content-container">
                <div style={{borderRadius:'5px'}} className="course-header">
                    <div style={{color:'white', marginLeft:'20px'}}><h2>{state?.code}&nbsp; {state?.name}</h2></div>
                </div>
                <div>
                    <p style={{color:'red'}}>{Error}</p>
                </div>
                <div className="course-content-box">
                    {courseContent?.length>0?
                    <div className="per-content-container">
                        {courseContent.map((content, index) =>(
                            <div className="per-content-div"  key={index}>
                                <p>{content?.body}</p>
                            <div style={{display:'flex', justifyContent:'space-between'}}>
                                <div style={{display:'flex'}}>
                                {content.attachments?.map((fi, index) =>(
                                    <a target="_blank" rel="noreferrer" className="attachment-link-box" style={{textDecoration:'none', color:'black'}} href={fi.file}>
                                    <div  className="per-file-attachment-div"  key={index}>
    
                                        <img style={{height:'30px'}} src={file} alt="file-icon"></img>
                                        <p s style={{fontSize:'15px', margin:'5px'}}>{fi.file.split('/').at(-1)}</p>
                                        
                                    </div>
                                    </a>
                                ))}
                                </div>
                                <div>
                                    <button  style={{border:'none'}} className="delete_post_button" onClick={()=>handleDelete(content.id)} >
                                             <img style={{height:'25px', width:'25px', backgroundColor:'white', border:'none'}} src={delete_icon} alt="delete"></img>                                   
                                    </button>
                                </div>
                            </div>
                            </div>
                        ))}
                    </div>:
                    <p>No Content Available</p>}
                </div>
                <div className="add-content-button">
                    <Link state={state} style={{margin:'10px',fontSize:'large', padding:'15px', backgroundColor:'#2C3E50', borderRadius:'5px', color:'white', textDecoration:'none', float:'right'}}   to={`/teacher/post/upload/${state?.code}`}>Add Content</Link>
                </div>
                
            </div>
             
        </div>
        
    )
}

export default TeacherCourse;