import React from "react";
import './PaymentDetails.css'

const PaymentDetails = ({payment, roll}) =>{
    
    return(
        <div className="payment-detail-div">
            <header><h2>{payment?.utr}</h2></header>
            <div  className="payment-pair">
                <div  className="payment-fields">
                    <label>Reference Number</label>
                    <p>{payment?.utr}</p>
                </div>
                <div  className="payment-fields">
                    <label>Amount (in Rupees)</label>
                    <p>{payment?.amount}</p>
                </div>
            </div>
            <div className="payment-pair">
                <div className="payment-fields">
                    <label>Name</label>
                    <p>{payment?.name}</p>
                </div>
                <div className="payment-fields">
                    <label>Roll Number</label>
                    {payment?.receipt? <p><a style={{textDecoration:'none'}} target="_blank" rel="noreferrer" href={payment?.receipt} >{payment?.receipt?.split('/')[payment?.receipt?.split('/').length-1]}</a></p>:<p>No Receipt Attached</p>}
                </div>
            </div>
            <div className="payment-pair">
                <div className="payment-fields">
                    <label>Date</label>
                    <p>{payment?.created_at.split('T')[0]}</p>
                </div>
                <div className="payment-fields">
                    <label>Category</label>
                    <p>CONTINUING STUDENT</p>
                </div>
            </div>
        </div>
    )
}




export default PaymentDetails;