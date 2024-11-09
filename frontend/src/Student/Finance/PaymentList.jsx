import React, { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import 'react-datepicker/dist/react-datepicker.css';
import PaymentDetails from "./PaymentDetails";
import Header from "../../components/New/Header";
import './PaymentList.css'
import { getAllPayments } from "../../actions/finance";
import { useSelector } from "react-redux";



const Paymentlist = () =>{
    

    const [financeData, setFinanceData] = useState()
    const navigate = useNavigate();
    const User = useSelector((state)=> state.authReducer).data;

    const handleNew = () =>{
        navigate('/student/payment/new')
    }

    const fetchInfo = async () => { 
            const res = await getAllPayments(User?.id);
            console.log(res);
            if(res.stat === 'C200')
            {
                setFinanceData(res.data);
            }
            else{
                alert('Failed to get data')
            }
    }    // 
    
    useEffect(() => {
        if(!User)
        {
            
            navigate('/');
            return;
        }
        fetchInfo();
    },[])
    
    

    return (
        <div>
            <Header/>
        <div style={{overflow:'hidden'}} className="paymentList-main-div">
            {!financeData?.length>0 && (<div style={{marginLeft:'10%', marginTop:'10px'}}><h1>No Data Available</h1></div>)}
            <div style={{minHeight:'300px'}}>
                {financeData?.map((payment) =>(
                    <PaymentDetails payment={payment} roll={2001196} key={payment?.utr} id={payment?.utr}/>
                ))}
            </div>
                    
            <button className="add-payment-button" style={{
                float:'right',
                marginRight:'10%',
                marginTop:'10px',
                marginBottom:'10px',
                padding:'10px',
                paddingLeft:'20px',
                paddingRight:'20px',
                fontSize:'20px',
                borderRadius:'5px',
                backgroundColor:'#2C3E50',
                color:'white',
                fontWeight:'400',
            }} onClick={handleNew}>NEW PAYMENT </button>
        </div>
        </div>
    )
}

export default Paymentlist;