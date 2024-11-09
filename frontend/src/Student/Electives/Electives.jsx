import React from "react";
import logo from '../../Assets/cs-logo.webp'
import './Elective.css';
import { Link } from "react-router-dom";

const Electives = () =>{

    const subjects = [
        {
            'name':'Opearating System',
            'code':'CS402',
        },
        {
            'name':'Database Management System',
            'code':'CS405',
        },
        {
            'name':'Computer Networks',
            'code':'CS403',
        },
        {
            'name':'Data Structure and Algorothms',
            'code':'CS408',
        },
        {
            'name':'Software Developement',
            'code':'CS408',
        },
    ]
    
    return (
        
        <div className="grid-container">
            {subjects.map((sub) =>(
                <div className="grid-item">
                    <Link state={sub} style={{textDecoration:'none'}} to={`/course/${sub.id}`}>
                        <div className="course-name">{sub.name}</div>
                        <div className="course-filler">
                            <img src={logo} className="course-filler-img" alt={sub.name}></img>
                        </div>
                    </Link>
              </div>
            ))}
    </div>
        
    )
}

export default Electives;