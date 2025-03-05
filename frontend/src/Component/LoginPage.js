import React, { useState } from 'react';
import axios from 'axios';
import {useNavigate} from "react-router-dom"
import { getSession, setSession} from './session';

function LoginPage(props) {
    const navigate=useNavigate();

    console.log("Session Data" , {"token": getSession('token'), "isLoggedIn":getSession('isLoggedIn'),  "userType":getSession('userType')})
    const[input, setInput]=useState({
        email: "",
        password: ""
    })
    
    const handleChange=(e)=>{
        const name=e.target.name;
        const value=e.target.value;
        setInput(values => ({...values ,[name]:value}))
    }

    const handleSubmit=(e)=>{
        if(input.email==="" || input.email==="")
        {
            alert("Please fill the details");
        }
        else{
            e.preventDefault();
        axios({
            method: 'post',
            url: 'http://localhost:4000/Energy/login',
            data:input ,
            headers: {
                'Content-Type': 'application/json',
            }
        })
        .then((data) => {
            console.log("res=> " ,data);
            if (data.data.status === "success") 
            {
                const Token = data.data.Token;
                const UserName = data.data.user.name;
                const UserType = data.data.user.userType;
                const uid =data.data.user.id;
                
                //console.log("Storage data =>" , {UserType,Token , UserName ,uid })

                setSession("token", { token: Token });
                setSession("userType", { userType: UserType });
                setSession("isLoggedIn", {isLoggedIn : true  });
                setSession("userName", {userName : UserName });
                setSession("UID", {UID : uid  });

            alert(data.data.msg);
            navigate("/")
            }
        })
        .catch((err)=>
            {
                if (err.response) {
                    alert(err.response.data.msg);
                    document.getElementById("login-form").reset();
                    navigate("/Login");
                  }
            })
        }
        
    }
    return (
        <div className='container'>
            <div className='box-container'>
                <div className='Heading'>
                    <h1> Login Page</h1>
                </div>
                <form id="login-form" method='POST'>

                        <label >Email ID</label>
                        <input required type="email" className='input' name='email' placeholder='Enter Yor Mail Id' onChange={handleChange} /><br /><br />

                        <label >Password</label>
                        <input required type="password" className='input' name='password' placeholder='Enter Your Password' onChange={handleChange}/> <br/><br/>
                    </form>
                <div className='bottom'>
                    <button className='btn-submit' onClick={handleSubmit}> Login</button>
                </div>
            </div>
        </div>
    );
}

export default LoginPage;