import React, { useEffect, useState ,useRef} from 'react';
import axios from 'axios';
import { useNavigate , Link} from "react-router-dom";
import { getSession } from './session';

function Data(props) {
    const navigate=useNavigate();

    console.log("************Data Page***************")

    const userName = getSession("userName");
    const isLoggedIn = getSession("isLoggedIn") ;
    const token = getSession("token") ;
    //console.log("Logged User in Data Page : ", isLoggedIn.isLoggedIn)
    
    //const [admin, setAdmin] = useState(false);
    const [ billData , setBillData]= useState([]);
    const allBills = useRef([])

    function addDaysToCurrentDate(days) {
        let currentDate = new Date();
        let futureDate = new Date(currentDate);
        futureDate.setDate(currentDate.getDate() + days);

        //or new Date(Date.now() + 30 * 86400000)
        return futureDate.toISOString();

    
    }

    const[input, setInput]=useState({
        Name:userName.userName,
        c_date: "" ,
        Reading: "" , 
        DueDate: addDaysToCurrentDate(30)
    })

    
    const fetchData=()=>{
        console.log("Token for fetch data api in data page :" , token)
            axios({
                url: "http://localhost:4000/Energy/getData",
                method: "GET",
                headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token.token}`, 
                }
            } ) // Replace with your API URLs
            .then((res) => { 
                console.log("All Bill Data",res.data.data);
                const data = res.data.data;
                allBills.current=data;
                setBillData([...data]);
            })
            .catch((error) => { 
                console.log(error.data);
                alert(error.data.msg);
            });
    }

    useEffect(()=>{
            fetchData();
    }, [])

    

    
    const handleChange=(e)=>{
        const name=e.target.name;
        const value=e.target.value;
        setInput(values => ({...values ,[name]:value}))
    }
    
    const handleSubmit=(e)=>{
        e.preventDefault();
        if(input.c_date!=="" && input.Reading!=="" && input.Name !=="")
        {

            console.log(input);
        axios({
            method: 'post',
            url: 'http://localhost:4000/Energy/addMeter',
            data: input,
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token.token}`,
              }
          })
        .then((res) => {
            console.log("Res =>", res)
            alert(res.data.msg);
            
            if(res==="Success"){
                navigate("/data" )
              }
            else{
                navigate("/data" )
              }
              setInput({
                c_date: "",
                Reading: "" })
                navigate("/data")
                fetchData();
        })
        }
        else{
            alert("Please fill all the details")
        }
    }
    const handleAlert=(status , bill_id , data)=>{
        if(status==="Paid"){
            alert("Payment Already Paid")
            navigate("/data");
        }
        else{
            console.log(data)
            navigate(`/Payment/${bill_id}` , {state:data})
        }
    }
    const handleDelete=(bill_id)=>{
        axios({
            url: `http://localhost:4000/Energy/delete/${bill_id}`,
            method: "delete",
            headers: {
              "Content-Type": "application/json",
              "Authorization": `Bearer ${token.token}`, 
            }
        }  ) 
        .then((res) => { 
            console.log(res.data);
            alert(res.data.msg)
            navigate("/data")
            fetchData();
        })
        .catch((error) => { 
            alert("Error in delete Api")
            console.log(error.data)
            //alert(error.data.msg)
            navigate("/data")
            fetchData();
        });
    }

    return (
        <div className='Table-Container'>
            <button type="button" class="btn btn-primary" data-toggle="modal" data-target="#exampleModal">Add Reading</button>
            
            <h1 style={{textAlign:'center' ,color:'white', paddingBottom:'10px'}}>Gas / Electricity Details</h1>
        <table class="table">
            <thead class="thead-dark">
                <tr>
                <th scope="col">Index</th>
                <th scope="col">Reading</th>
                <th scope="col">Charges</th>
                <th scope="col">Total Amount</th>
                <th scope="col">Due Date</th>
                <th scope="col">Status</th>
                <th scope="col">Pay</th>
                <th scope='col'>Delete</th>
                </tr>
            </thead>
            <tbody>
            {
                billData.map((data , index) => (
                    <tr key={data._id}> {/* ✅ Move `key` here */}
                        <td>{index +1}</td>
                        <td>{data.reading}</td>
                        <td>{data.charges}</td>
                        <td>{data.amount}</td>
                        <td>{data.dueDate.split("T")[0]}</td>
                        <td>{data.status}</td>
                        <td> 
                        {/*  sharing state to next component dynamically using link - for this you have to use useLocation to fetch data check payment comment for this

                            <Link to={`/Payment/${data._id}`} state={{ data }} onClick={() => handleAlert(data.status ,data._id )}>
                                <span className="material-symbols-outlined">credit_card</span>
                            </Link>
                            */}
                            <div onClick={() => handleAlert(data.status ,data._id  ,data)}>
                            <span class="material-symbols-outlined">credit_card</span>
                            </div>
                        </td>
                        

                        <td>
                            <Link to={`/Data/${data._id}`} onClick={() => handleDelete(data._id)} >
                                <span className="material-symbols-outlined">delete</span>
                            </Link>
                            <br />
                        </td>
                    </tr>
                ))
            }
            </tbody>
        </table>
        

        {/* Model */}
        <div class="modal fade" id="exampleModal" tabindex="-1" role="dialog" aria-label="exampleModalLabel" aria-hidden="true">
            <div class="modal-dialog" role="document">
                <div class="modal-content">
                <div class="modal-header">
                <h5 style={{color:'#6d4fc2'}} class="modal-title" id="exampleModalLabel">Add  New Reading </h5>
                    {/* <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                    </button> */}
                </div>
                <div class="modal-body">
                    <form method='post'>
                    <div class="col-sm-10">
                        <label for="date">Date</label>
                        <input className='form-control' type="date" value={input.c_date}  name="c_date" onChange={handleChange} required />
                    </div>
                    <br></br>
                    <div class="col-sm-10">
                        <label for="Reading">Reading</label>
                        <input className='form-control' type="number"name="Reading" value={input.Reading} onChange={handleChange} required/>
                    </div>
                    </form>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                    <button type="button" class="btn btn-primary" data-dismiss="modal" onClick={handleSubmit}>Save changes</button>
                </div>
                </div>
            </div>
            </div>
            
        </div>
    );
}

export default Data;