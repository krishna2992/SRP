import React from "react";
import './Footer.css'
import iiitg from '../../Assets/iiitg_logo.png'
const Footer = () =>{
    return (
    <div className="footer-main">
        <div className="footer-container">
            <div className="footer-div-1">
                <div><img src={iiitg} alt="iiitg-transparent"></img></div>
                <div>Bongora, Assam<br></br>
                    Guwahati -781015<br></br>
                    INDIA<br></br> 
                    0824 2474000<br></br>
                    registrar@iiitg.ac.in
                </div>

            </div>
            <div className="footer-div-2">
                <h2>Quick Links</h2>
                <div className="footer-links-div">
                    <p><a target="_blank" rel="noreferrer" href="https://www.iiitg.ac.in/">IIITG Home</a></p>
                    <p><a target="_blank" rel="noreferrer" href="https://www.iiitg.ac.in/library">Library</a></p>
                    <p><a target="_blank" rel="noreferrer" href="https://www.iiitg.ac.in/academic">Curriculum</a></p>
                    <p><a target="_blank" rel="noreferrer" href="https://www.iiitg.ac.in/fees">Fees Structure</a></p>
                    <p><a target="_blank" rel="noreferrer" href="https://www.iiitg.ac.in/calendar">Academic Calender</a></p>
                    
                </div>
            </div>
            <div></div>
        </div>
        <div style={{color:'white', marginLeft:'100px'}}>Copyright © 2022-2025 IIIT Guwahati, India. All rights reserved.</div>
    </div>
    )
}

export default Footer;