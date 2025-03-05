const {connectionWithMongoose ,userModel , meterModel , paymentModel} = require('../models/database');
const bcrypt=require('bcrypt');
const jwt=require('jsonwebtoken');
const mongoose =require('mongoose')
const moment= require("moment")

//npm install date-fns

require("dotenv").config();


const RegisterController = async(req,res)=>{
    connectionWithMongoose();
    try{
        const {name,email, password , userType , secretKey}= req.body;
        console.log(req.body);
        var user= await userModel.findOne({email});
        if (user){
            console.log("User Already Existing ! Please try to Login")
            return res.json({msg:"User Already Existing ! Please try to Login"})
        }
        else{
            console.log("hi")
            user = await new userModel({name:name,email:email,password:password,userType:userType , secretKey:secretKey}) ;
            const salt = await bcrypt.genSalt(10);
            user.password = await bcrypt.hash(password, salt);
            await user.save();
            console.log("Data Saved in Database")
            // const token=jwt.sign({id:user.id},process.env.SECRET,{expiresIn:'7d'});
            console.log("Register Successfully")
            res.status(201).json({msg:"Successfully Register"})
        }
    }
    catch(err){
        res.status(500).json({msg:"Server Error"})
        console.log(err)
    }
}


const LoginController = async(req,res)=>{
    connectionWithMongoose();
    try {
        const { email, password } = req.body;
        //console.log("Login Request Data =>", req.body);

        // Check if the user exists
        const user = await userModel.findOne({ email });
        if (!user) {
            console.log("User Not Found! Please Register");
            return res.status(400).json({ msg: "User not found! Please register." });
        }

        // Validate Password
        const isMatch = await bcrypt.compare(password, user.password);
        //console.log("Password Status :" , isMatch )
        if (!isMatch) {
            console.log("Invalid Credentials!");
            return res.status(401).json({ msg: "Invalid email or password" });
        }

        // Generate JWT Token
        const token = jwt.sign(
            { id: user._id, userType: user.userType }, 
            process.env.SECRET, {
            expiresIn: "7d",
        });

        console.log("User Logged In Successfully");
        if(res.status(201)){
            return res.json({status: "success", msg:"Login Successfully", Token: token ,user:{id:user.id,name:user.name,email:user.email,userType:user.userType} })
        }
        else{
            return res.json({ status: "error" , msg:"Failed to Login"});
        }
    } 
    catch (error) {
        console.error("Error in LoginController:", error);
        res.status(500).json({ msg: "Server Error" });
    }
}

function addDays(dateString, days) {
    return moment(dateString).add(days, 'days').format('YYYY-MM-DD');
}

// ****************************************Need to review code***********************************************


const addMeter=async(req,res)=>{
    connectionWithMongoose();
    const { c_date, Reading ,  Name , DueDate} = req.body;
    console.log("AddMeter Request data" ,{ c_date, Reading , DueDate , Name} );

    const UID = req.user._id //.toString();
    //console.log("UID in addMeter" , UID);
    const  name=Name;
    const reading = Number(Reading);
    const charges= (reading * 7) / 100;
    const amount= reading + charges;
    const status='Due';
    const date = c_date;
    const dueDate =  DueDate || addDays(date ,30);
    console.log("date",date);

    //console.log({UID : UID , name:name,charges:charges , reading:reading, amount:amount, status:status , date:date ,dueDate:dueDate} )
    try{
        const record= await new meterModel({UID : UID , name:name,charges:charges , reading:reading, amount:amount, status:status , date:date ,dueDate:dueDate}) ;
        await record.save();
        console.log(record);
        res.status(200).json({msg:"Charges Added Successfully" , status:"success" })
    }
    catch(err){
        res.status(500).json({msg:"Charges Not Added" , status:"error"})
        console.log(err)
    }
}


const addPayment = async(req,res)=>{
    connectionWithMongoose();
    // const bill_id = req.param.bill_id;
    // console.log("req.param.bill No" ,bill_id);

    //console.log("UID in getting Data" , bill_no);
    // const upi_id = Upi ;
    // const mpin =Mpin;
    // const amount=Amount;
    // const payMode =Paymode;

    // const bill_ID = Bill_id ;
    const {Amount ,Paymode , Upi,Mpin ,Bill_id } = req.body;
    //console.log("Payment data" ,{ Amount ,Paymode , Upi,Mpin , Bill_id} )
    const status="Paid";
    try{
        var data= await meterModel.findOne({_id:Bill_id}); 
        var paydata= await paymentModel.findOne({bill_id:Bill_id});
        //console.log("Paydata",paydata);
        console.log("Bill data:",data)
        if((!paydata || paydata.length === 0) && data.status==="Due")
        {
            console.log("here")
            if (data.status!=="Paid" )
            {
                await meterModel.updateOne({_id:Bill_id},{$set:{status:"Paid"} })

                const record= await new paymentModel({bill_id:Bill_id, upi_id:Upi, mpin:Mpin ,amount:Amount ,payMode:Paymode ,status:status }) ;
                await record.save();

                res.status(200).json({msg:"Thank You for Payment" , status:"success" })

                console.log("Added Successfully", record);
            }
        }
        else{
            res.json({msg:"Payment already Paid" , status:"error" })
        }
    }
    catch(err){
        res.status(500).json({msg:"Server Error ! Please Try Later" , status:"error"})
        console.log(err)
    }
}

const getData=async(req,res)=>{
    connectionWithMongoose();
    const UID = req.user._id//.toString()
    console.log("UID in get data routes :" ,UID , typeof(UID));
    try{
        var data= await meterModel.find({UID:UID});
        //console.log("UID Data" , data)
        if(data){
            res.status(201).json({msg:"Data Found" , data:data})
            //console.log("All Bill records :", data);
        }
        else{
            res.json({msg:"Data Not Found !"})
        }
    }
    catch(err){
        res.status().json({msg:"Data Not Found , Please add new meter" })
        console.log(err);
    }
}



const getUsers=async(req,res)=>{
    connectionWithMongoose();
    try{
        
        var data= await userModel.find();
        console.log("dat ===>",data)
        if(data){
            res.status(201).json({msg:"Data Found" , data:data})
            //console.log("All User Details :", data);
        }
        else{
            res.json({msg:"Data Not Found !"})
        }
    }
    catch(err){
        err.status().json({msg:"Data Not Found , Please add new meter" })
        console.log(err);
    }
}

const deleteBill=async (req, res) => {
    connectionWithMongoose();
    try {
        const bill_id = req.params.bill_id;
        console.log("-----" ,bill_id)
        const billRecord = await meterModel.findOne({ _id: bill_id });
        var paymentRecord= await paymentModel.findOne({bill_id:bill_id});
        console.log("bill record in delete route:",paymentRecord);
         console.log(billRecord)

        if (!paymentRecord ) {
            const dr = await meterModel.deleteOne({_id:bill_id});
            console.log("User deleted successfully" ,dr)
            res.status(200).json({ msg: 'Record Deleted' });
        }
        else{
            res.json({ msg: "Amount is Already Paid ! Could not able to delete record" });
            console.log("Amount is Already Paid ! Could not able to delete record")
        }
        
    } catch (error) {
        res.status(500).json({ msg: 'Server Error', error });
    }
};

module.exports={
    LoginController,
    RegisterController,
    addMeter,
    getData,getUsers,
    addPayment , 
    deleteBill
}