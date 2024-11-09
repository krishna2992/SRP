import React from "react";
import Header from "../../components/New/Header";
import { Link } from "react-router-dom";
import logo from '../../Assets/application.png'

const AcadPage  = () =>{
    return(
        <div>
            <Header/>
            
            <div className="grid-container">
            <div  className="grid-item">
                    <Link style={{textDecoration:'none'}} to='/student/finance'>
                        <div className="course-name">Finance</div>
                        <div style={{height:'400px', width:'400px', display:'flex',alignItems:'center', justifyContent:'center'}} className="course-filler">
                            <img alt="" style={{height:'200px', width:'200px'}} src={logo} className="course-filler-img" ></img>
                        </div>
                    </Link>
                </div>
            
                
                <div  className="grid-item">
                    <Link style={{textDecoration:'none'}} to='/student/acad/leave'>
                        <div className="course-name">Leave Application</div>
                        <div style={{height:'400px', width:'400px', display:'flex',alignItems:'center', justifyContent:'center'}} className="course-filler">
                            <img alt="" style={{height:'200px', width:'200px'}} src={logo} className="course-filler-img" ></img>
                        </div>
                    </Link>
                </div>
                <div  className="grid-item">
                    <Link style={{textDecoration:'none'}} to='/student/bonafide'>
                        <div className="course-name">Bonafide Application</div>
                        <div style={{height:'400px', width:'400px', display:'flex',alignItems:'center', justifyContent:'center'}} className="course-filler">
                            <img alt="" style={{height:'200px', width:'200px'}} src={logo} className="course-filler-img" ></img>
                        </div>
                    </Link>
                </div>
                
            
        </div>
        </div>
    )
}

export default AcadPage;