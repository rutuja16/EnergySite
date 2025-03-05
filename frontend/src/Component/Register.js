import React , {useState} from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Register(props) {
    const navigate=useNavigate();
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [userType, setUserType] = useState("");
    const [cPassword, setCPassword] = useState("");
    const [secretKey, setSecretKey] = useState("");

    const handleSubmit=(e)=>{
        if (userType === "Admin" && secretKey !== "Admin1234") {
            e.preventDefault();
            alert("Invalid Admin");
        } 

        else{
            if(name==="" || email==="" || password==="" || userType==="" || cPassword==="")
                alert("Please fill all the fields")
            else if(cPassword === password)
                {
                    e.preventDefault();
                    axios({
                        method: 'post',
                        url: 'http://localhost:4000/Energy/Register',
                        data: {name,email,password,userType}
                    })
                    .then((res) => { 
                        console.log(res)
                        if(res.status === 201  ){
                            navigate("/Login")
                            alert(res.data.msg);
                        }
                        else{
                            alert(res.data.msg);
                            navigate("/Login")
                        }
                })
                    .catch((err)=>{
                        alert("Server Error !")
                        console.log(err)
                    })
                }
        }
    }
        return (
            <div className='container'>
                <div className='box-container'>
                    <div className='Heading'>
                        <h1> Register Page </h1>
                    </div>
                    <form method='POST'>
                        <div>
                            <label>Register As</label>
                            <input type="radio" name="UserType" value="User" onChange={(e) => setUserType(e.target.value)} required/> User <span>    </span>
                            <input type="radio" name="UserType" value="Admin" onChange={(e) => setUserType(e.target.value)} required/> Admin
                        </div>
                        <br></br>

                        {userType === "Admin" ? (
                            <div className="mb-3">
                            <label>Secret Key</label>
                            <input
                                type="text"
                                className="input"
                                placeholder="Secret Key"
                                required
                                onChange={(e) => {secretKey? setSecretKey(e.target.value) :setSecretKey("userkey")}}
                            />
                            </div>
                        ) : null}

                        <label >Name</label>
                        <input required type="text" className='input' name='name' placeholder='Enter Your Name' onChange={(e) => setName(e.target.value)} /><br /><br />

                        <label >Email ID</label>
                        <input required type="email" className='input' name='email' placeholder='Enter Yor Mail Id' onChange={(e) => setEmail(e.target.value)} /><br /><br />

                        <label >Password</label>
                        <input required type="password" className='input' name='password' placeholder='Enter Your Password' onChange={(e) => setPassword(e.target.value)}/> <br/><br/>

                        <label >Confirm Password</label>
                        <input required type="password" className='input' name='cpass' placeholder='Enter Your Confirm Password' onChange={(e) => setCPassword(e.target.value)}/><br/><br/>

                    </form>
                    <div className='bottom'>
                        <button className='btn-submit' onClick={handleSubmit}> Register</button>
                    </div>
                </div>
            </div>
        );
}

export default Register;