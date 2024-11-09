import React, { useState } from "react";
import './NewPayment.css'
import Header from "../../components/New/Header";
import { submitPayment } from "../../actions/finance";
import { useNavigate } from "react-router-dom";
import { useSelector } from 'react-redux';

const NewPayment = () =>{
      
  const User = useSelector((state)=> (state.authReducer)).data;
  const [referenceNumber , setRefreenceNumber] = useState('');
  const [amount, setAmount] = useState('');
  const [name, setName] = useState('');
  const [purpose, setPurpose] = useState('');
  const [selectedFile, setSelectedFile] = useState(null);
  const navigate = useNavigate();
  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setSelectedFile(file);
  };

  const handleSubmit = async (event) =>{
    event.preventDefault();
    if(!referenceNumber)
    {
        alert('Reference Number should not be empty');
        return
    }
    if(amount)
    {
        if(isNaN(amount))
        {
            alert('Amount should be a valid Number');
            return
        }
    }
    else{
        alert('Please fill valid amount');
        return
    }
    if(!name)
    {
        alert('Please Enter Your Name');
    }
    const formData = new FormData();
    formData.append('utr', referenceNumber);
    formData.append('name', name);
    formData.append('amount', amount);
    formData.append('purpose', purpose);
    formData.append('receipt', selectedFile);
    const data = await submitPayment(User?.id, formData);
    console.log(data)
    if(data['stat']!=='C200')
    {
        alert(data.msg);
    }
    else{
        navigate('/student/finance');
    }
  }

    return(
        <div>
            <Header/>
        <div className='ask-question'>
        <div className="ask-ques-container">
            <h1>Add New Payment</h1>
            <form>
                <div className='ask-form-container'>
                    <label htmlFor='ask-payment-ref'>
                        <h4>Reference Number</h4>
                        <p>Enter SBI Collect UTR Number, Check Number etc</p>
                        <input onChange={e => setRefreenceNumber(e.target.value)} type='text' placeholder='e.g. DUM65892014' id='ask-payment-ref'/>
                    </label>
                    <label htmlFor='ask-payment-amount'>
                        <h4>Amount (in Ruppees)</h4>
                        <p>Enter Payment Amount in INR</p>
                        <input onChange={e => setAmount(e.target.value)} type='text' placeholder='e.g. 90000' id='ask-payment-amount'/>
                    </label>
                    <label htmlFor='ask-payment-name'>
                        <h4>Name</h4>
                        <p>Enter Payee Name</p>
                        <input onChange={e => setName(e.target.value)} type='text' placeholder='e.g. Victor Creed' id='ask-payment-name'/>
                    </label>
                    <label htmlFor='ask-payment-purpose'>
                        <h4>Purpose</h4>
                        <p>Enter Purpose of Payment</p>
                        <input onChange={e => setPurpose(e.target.value)} type='text' placeholder='e.g. Mess Payment, Hostel Rent' id='ask-payment-purpose'/>
                    </label>
                    <h4>Receipt</h4>
                    <label className="custom-file-upload">
                        
                        {!selectedFile?<p className="file-upload-p"><input style={{display:'none'}} onChange={handleFileChange}  type="file"/>Choose File</p>:
                        <p  className="file-upload-p">{selectedFile.name}</p>}
                    </label>
                </div>
                <input type='submit' onClick={handleSubmit} value='Review Your Payment' className='review-btn'/>
            </form>
        </div>
    </div>
    </div>
    )
}

export default NewPayment;