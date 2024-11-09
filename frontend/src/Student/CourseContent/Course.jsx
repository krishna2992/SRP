import React, { useEffect, useState } from "react";
import {useParams, useNavigate, useLocation} from 'react-router-dom';
import './Course.css'
import Header from "../../components/New/Header";
import file from '../../Assets/file_icon.png'
import { getSubjectPosts } from "../../actions/posts";

// import {FileViewer} from 'react18-file-viewer';

const Course = () =>{
    const {code} = useParams();
    const [courseContent, setCourseContent] = useState([]);
    const {state} = useLocation();

    const fetchPosts =  async ()=> {
        const data = await getSubjectPosts(code);
        if(data.stat === 'C200')
        {
            setCourseContent(data?.data?.posts);
        }
        else{
            alert('Failed To Fetch Posts');
        }
    }

    useEffect(()=>{
        fetchPosts();
    }, [])

    return (
        <div>
            <Header/>
            <div className="course-content-container">
                <div className="course-header">
                    <div style={{color:'white', marginLeft:'20px'}}><h2>{state?.code}&nbsp; {state?.name}</h2></div>
                </div>
                
                <div className="course-content-box">
                    {courseContent?.length>0?
                    <div className="per-content-container">
                        {courseContent.map((content, index) =>(
                            <div className="per-content-div"  key={index}>
                                <p>{content?.body}</p>
                                <div style={{display:'flex'}}>
                                {content.attachments?.map((f, index) =>(
                                    <a target="_blank" rel="noreferrer" className="attachment-link-box" style={{textDecoration:'none', color:'black'}} href={f.file}>
                                    <div className="per-file-attachment-div"  key={index}>
    
                                        <img style={{height:'30px'}} src={file} alt="file-icon"></img>
                                        <p style={{fontSize:'20px', margin:'0'}}>{f.file.split('/').at(-1)}</p>
                                        
                                    </div>
                                    </a>
                                ))}
                                </div>
                            </div>
                        ))}
                    </div>:
                    <p>No Content Available</p>}
                </div>
                
            </div>
             
        </div>
        
    )
}

export default Course;