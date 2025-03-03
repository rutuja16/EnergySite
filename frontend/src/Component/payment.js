import React, {useState} from 'react';
import { useLocation ,useParams , useNavigate } from 'react-router-dom';
import axios from 'axios';
import { getSession } from './session';
// import { userModel } from '../../../backend/src/models/database';

function Payment() {
    const navigate=useNavigate();

    const isLoggedIn = getSession("isLoggedIn");
    console.log("Logged User in payment page : ", isLoggedIn.isLoggedIn)

    const { bill_id } = useParams(); // Extract ID from URL
    const location = useLocation();
    const data = location.state?.data;
    //chaecking data
    // console.log("Data through Location",data)
    // console.log({bill_id})
    
    const token = getSession("token");
    const[input, setInput]=useState({
            Bill_id:bill_id,
            Amount:data.amount ,
            Paymode: "", 
            Upi:"",
            Mpin:"" ,
        })
    
    const handleChange=(e)=>{
        const name=e.target.name;
        const value=e.target.value;
        setInput(values => ({...values ,[name]:value}))
    }

     const handleSubmit=(e)=>{
         //e.preventDefault();
         console.log("Payment Input data", input);
         axios({
             method: 'post',
             url: `http://localhost:4000/Energy/payment/${bill_id}`,
             headers: {
                 "Content-Type": "application/json",
                "Authorization": `Bearer ${token.token}`, 
               },
                data: input,
           })
         .then((res) => {
             console.log(res);
             alert(res.data.msg);
             navigate("/data")
         })
         .catch((e)=>console.log(e))
     }

    return (
        <div className='container'>
            <div className='box-container'>
                <div className='Heading'>
                    <h1> Payment </h1>
                </div>
                <form method="POST">
                    <div className="form-group col-md-12">
                        <label>Name</label>
                        <input type="text" value={data?.name} readOnly className="form-control" />
                    </div>

                    <div className="form-group col-md-12">
                        <label>Amount to Pay</label>
                        <input
                            type="number"
                            name="Amount"
                            required
                            readOnly
                            className="form-control"
                            value={data.amount}
                        />
                    </div>

                    <br />

                    <div className="form-group col-md-12">
                        <label>Payment Mode</label>
                        <select className="custom-select my-1" name='Paymode' value={input.Paymode} onChange={handleChange} >
                            <option value="" disabled>Select Payment Mode</option>
                            <option value="Phone Pay">Phone Pay</option>
                            <option value="G-Pay">Google Pay</option>
                            <option value="Paypal">Paypal</option>
                        </select>
                    </div>

                    <br />

                    <div className="form-group col-md-12">
                        <label>UPI ID</label>
                        <input
                            type="text"
                            required
                            className="form-control"
                            value={input.Upi}  // Fixed: Ensure input state matches 'name'
                            name="Upi"
                            pattern="^[a-zA-Z0-9.\-_]+@[a-zA-Z]{3,}$"
                            onChange={handleChange}
                            placeholder="example@ibl"
                        />
                    </div>

                    <br />

                    <div className="form-group col-md-12">
                        <label>MPin</label>
                        <input
                            type="password"
                            required
                            className="form-control"
                            value={input.Mpin}
                            maxLength={6}
                            name="Mpin"
                            onChange={handleChange}
                            placeholder="Enter 6 Digit MPIN"
                        />
                    </div>
                </form>

                <br></br>
                <div className='bottom'>
                    <button className='btn-submit' onClick={handleSubmit} > Pay</button>
                </div>
            </div>
        </div>
    );
}

export default Payment;