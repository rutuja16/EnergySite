import React from 'react';
import {Link ,useNavigate} from 'react-router-dom';
import { getSession, setSession } from '../Component/session';

function TopNav() {
  const navigate =useNavigate()
  // session Data
  const userType = getSession("userType")||"";
  const isLoggedIn = getSession("isLoggedIn") || false;
  const userName = getSession("userName") || "GUEST";

  console.log("TopNav userType and login status => " , {userType:userType , isLoggedIn:isLoggedIn})
  // const UID = getSession("UID");
  //const token = getSession("token");s
  const logout=(e)=>{
    //localStorage.clear();
    sessionStorage.clear();
    setSession("isLoggedIn", {isLoggedIn : false  });
    //alert( " Session Expired " + getSession('token'));
    navigate("/")

  }
  return (
        <div>
            <div className='Navbar'>
            
              {!isLoggedIn.isLoggedIn && (
                <>
                  <>
                    <h1>Hello Guest</h1>
                  </>
                
                  <>
                    <button className='btn'><Link to="/Login">Sign In</Link></button>
                    <button className='btn'><Link to="/Register">Sign Up</Link></button>

                    {/* <button className='btn'><a href='/Login'>Sign In</a></button>
                    <button className='btn'><a href='/Register'>Sign In</a></button> */}
                  </>

                  
                </>
              )}

              {isLoggedIn.isLoggedIn && userType.userType === "Admin" ? (
                <>
                    <>
                      <h1>{userName ? `Welcome ${JSON.parse(JSON.stringify(userName.userName))}` : "Guest"}</h1>
                    </>
                    <>
                    <button className='btn'><Link to='/' >Home</Link></button>
                    <button className='btn'><Link to='/dashboard' >Dashboard</Link></button>
                    <button className='btn' onClick={logout}>Logout</button>
                    </>
                </>
              ) : 
              (isLoggedIn.isLoggedIn &&  (
                  <>
                    <>
                      <h1>{userName ? `Hi, ${JSON.parse(JSON.stringify(userName.userName))}` : "Guest"}</h1>
                    </>
                    <>
                      <button className='btn'><Link to='/' >Home</Link></button>
                      <button className='btn'><Link to="/Data">Bill Data</Link></button>
                      <button className='btn' onClick={logout}>Logout</button>
                    </>
                  </>
                )
              )}


            </div>
        </div>
  )
}

export default TopNav;