import React, { useEffect, useState ,useRef} from 'react';
import axios from 'axios';


function Dashboard(props) {
    const [ users , setUsers]= useState([]);
    const allUsers = useRef([])

    const fetchUsers=()=>{
            axios({
                url: "http://localhost:4000/Energy/getUsers",
                method: "GET",
            } ) // Replace with your API URLs
            .then((res) => { 
                console.log("All Users",res.data.data);
                const data = res.data.data;
                allUsers.current=data;
                setUsers([...data]);
            })
            .catch((error) => { 
                console.log(error);
                //alert(error.data.msg);
            });
    }

    useEffect(()=>{
            fetchUsers();
    },[])

    return (
        <div className='Table-Container'>

            <h1> User Details</h1>
            <table class="table ">
                <thead class="thead-dark">
                    <tr>
                    <th scope="col">Index</th>
                    <th scope="col">Name</th>
                    <th scope="col">Type</th>
                    <th scope="col">Email</th>
                    <th scope="col">Password</th>
                    </tr>
                </thead>
                <tbody>
                {
                    users.map((data , index) => (
                        <tr key={data._id}> {/* ✅ Move `key` here */}
                            <td>{index +1}</td>
                            <td>{data.name}</td>
                            <td>{data.userType}</td>
                            <td>{data.email}</td>
                            <td>{data.password}</td>
                        </tr>
                    ))
                }
                </tbody>
            </table>
        </div>
    );
}

export default Dashboard;