import React, {useEffect, useState} from "react";
import file from '../../Assets/file_icon.png'
import './PaymentVerification.css'
import { useParams } from "react-router-dom";
import TeacherHeader from "../../components/New/TeacherHeader";
import { getAllPayments, verifyStudentPayments } from "../../actions/finance";
import Paymentlist from "../../Student/Finance/PaymentList";


const StudentPayments = () =>{

    const {id} = useParams();
    const student= {'roll':2001196, name:'Krishna Suryawanshi'};
    const [sign, setSign] = useState(false);
    const [paymentsList, setPaymentsList] = useState([]);
    

    const handleSign = () =>{
        setSign(!sign);
    }

    const handleSubmit = async() =>{
        const res = await verifyStudentPayments(id)
        if(res.stat === 'C200')
        {
            alert('Student Verified Succesfully');
        }
        else{
            alert(res.msg);
        }
    }

    const getStudentPayments = async ()=>{
        const res = await getAllPayments(id);
        console.log(res)
        if(res.stat === 'C200')
        {
            setPaymentsList(res.data);
        }
    }

    useEffect(()=>{
        getStudentPayments();
    }, [])

    return (
        <div>
            <TeacherHeader/>
        <div style={{margin:'1%', marginRight:'10%'}} className="student-payment-page">
            <div className="student-info-box">
                <h1 style={{fontWeight:'500'}}>{student.name}</h1>
                <h3 style={{fontWeight:'400'}}>{student.roll}</h3>
            </div>
            {paymentsList.length>0 && (
                <div className="student-payment-list">
                {paymentsList.map((payment) =>(
                    <div className="student-payment-div">
                        <div className="student-payment-div-field">
                            <label>Reference Number</label>
                            <p>{payment.utr}</p>
                        </div>

                        <div className="student-payment-div-field">
                            <label>Amount</label>
                            <p>Rs. {payment.amount}</p>
                        </div>

                        <div className="student-payment-div-field">
                            <label>Date</label>
                            <p>{payment.created_at.split('T')[0]}</p>
                        </div>

                        <div className="student-payment-div-field">
                            <label>Receipt</label>
                            {payment?.receipt ? (
                            <p className="payment-receipt-anim">
                                <a style={{textDecoration:'none'}} target="_blank" rel="noreferrer" href={payment?.receipt}>
                                    <div className="receipt-file-div">
                                        <img cl src={file} alt="receipt"/>
                                        <p style={{border:'none'}}>{payment.receipt.split('/')[payment.receipt.split('/').length-1]}</p>
                                    </div>
                                </a>
                            </p>):(<p>No receipt Submitted</p>)}
                        </div>

                    </div>
                ))}
                </div>
            )}
            <div style={{display:'flex', justifyContent:'flex-end'}} className="sign-student-button">
                {!sign?<div>
                <button onClick={handleSign}>Sign Student</button>
                </div>:
                <div className="signature-box-div">
                    <input type="text" placeholder="Enter Your Name"></input>
                    <button onClick={handleSubmit}> Submit</button>
                </div>}

            </div>
             
        </div>
        </div>
    )
}

export default StudentPayments;