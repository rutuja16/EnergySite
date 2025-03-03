const {connectionWithMongoose ,userModel , meterModel} = require('../models/database');
const bcrypt=require('bcrypt');
const jwt=require('jsonwebtoken');
const mongoose =require('mongoose')

require("dotenv").config();

// const LoginController = async(req,res)=>{
//     //connectionWithMongoose
//     const {email, password}= req.body;
//     //console.log(req.body)
//     try{
//         const user=await userModel.findOne({email});
//         console.log("user ->",user)
//         if (!user)
//             return res.json({err:"User Not Exist ! Please Register"})

//         const isMatch= await bcrypt.compare(password,user.password);
//         //console.log(isMatch, "**",password , user.password)
//         if(!isMatch)
//             return res.status(400).json({Msg:"Invalid Credentials"});

//         const token= jwt.sign({id:user.id},process.env.SECRET,{expiresIn:"1h"});
//         //console.log(token)
//         if(res.status(201)){
//             return res.json({status: "success", Token: token ,user:{id:user.id,name:user.name,email:user.email,userType:user.userType} })
//         }
//         else{
//             return res.json({ error: "error" });
//         }
//     }
//     catch(err){
//         res.status(500).json({msg:"Server Error"})
//         console.log(err)s
//     }
// }
const LoginController = async(req,res)=>{
    //connectionWithMongoose
    const {email, password}= req.body;
    console.log(req.body)
    try{
        const user=await userModel.findOne({email});
        console.log("user  Data->",{email: user.email , DBpassword: user.password , req_pass:password})
        if (user)
        {
            //const isMatch= await bcrypt.compare(password,user.password);
            //console.log(isMatch, "**",password , user.password)
            // if(password === user.password)
            // {
            //     const token= jwt.sign({id:user.id},process.env.SECRET,{expiresIn:"24h"});
            //     //console.log(token)
            //     if(res.status(201)){
            //         return res.json({status: "success", Token: token ,user:{id:user.id,name:user.name,email:user.email,userType:user.userType} })
            //     }
            //     else{
            //         return res.json({ error: "error" });
            //     }
            // }
            // else{
            //     return res.status(400).json({Msg:"Invalid Credentials"});
            // }
        }
        else{
            return res.json({err:"User Not Exist ! Please Register"})
        }
    }
    catch(err){
        res.status(500).json({msg:"Server Error"})
        console.log(err)
    }
}

// const LoginController = async(req,res)=>{
//     //connectionWithMongoose
//     const {email, password}= req.body;
//     //console.log(req.body)
//     try{
//         const user=await userModel.findOne({email});
//         console.log("user ->",user)
//         if (!user)
//             return res.json({err:"User Not Exist ! Please Register"})

//         const isMatch= await bcrypt.compare(password,user.password);
//         //console.log(isMatch, "**",password , user.password)
//         if(!isMatch)
//             return res.status(400).json({Msg:"Invalid Credentials"});

//         const token= jwt.sign({id:user.id},process.env.SECRET,{expiresIn:"1h"});
//         //console.log(token)
//         if(res.status(201)){
//             return res.json({status: "success", Token: token ,user:{id:user.id,name:user.name,email:user.email,userType:user.userType} })
//         }
//         else{
//             return res.json({ error: "error" });
//         }
//     }
//     catch(err){
//         res.status(500).json({msg:"Server Error"})
//         console.log(err)s
//     }
// }


const RegisterController = async(req,res)=>{
    const {name,email, password , userType}= req.body;
    console.log("data =>" ,req.body);
    try{
        
        var user= await userModel.findOne({email});
        if (user)
            return res.status(400).json({msg:"User Already Exist", email:user})


        user = await new userModel({name,email,password,userType}) ;
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(password, salt);
        await user.save();

        const token=jwt.sign({id:user.id},process.env.SECRET,{expiresIn:'7d'});
        console.log(token)
        res.status(201).json({token,msg:"Successfully Register",user:{id:user.id,name:user.name,email:user.email,userType:user.userType}})
    }
    catch(err){
        res.status(500).json({msg:"Server Error"})
        console.log(err)
    }
}

// function addDays(dateString, days) {
//     return moment(dateString).add(days, 'days').format('YYYY-MM-DD');
// }

const addMeter=async(req,res)=>{
    connectionWithMongoose();
    const { c_date, Reading , DueDate , Name} = req.body;
    console.log("Charge data" ,{ c_date, Reading , DueDate , Name} )

    const UID = req.user._id.toString();
    console.log("UID in addMeter" , UID);
    const  name=Name;
    const charges=50;
    const reading =Reading;
    const amount= reading + charges;
    const status='Due';
    const date = c_date;
    const dueDate =DueDate ;
    try{
        const record= await new meterModel({UID ,name,amount,reading, charges,amount ,c_date, status, dueDate }) ;
        await record.save();
        res.status(200).json({msg:"Charges Added Successfully" , status:"success" })
        console.log(record);
    }
    catch(err){
        res.status(500).json({msg:"Charges Not Added" , status:"error"})
        console.log(err)
    }
}

const addPayment = async(req,res)=>{
    connectionWithMongoose();

    const uid=req.param.uid;
    const {Amount ,Paymode , Upi,Mpin} = req.body;
    console.log("Payment data" ,{ Amount ,Paymode , Upi,Mpin} )

    console.log("UID in getting Data" , uid);

    const upi_id =Upi ;
    const mpin =Mpin;
    const amount=Amount;
    const status="Paid";
    
    try{
        const record= await new paymentModel({uid,upi_id,mpin ,amount ,status }) ;
        await record.save();
        res.status(200).json({msg:"Thank You for Payment" , status:"success" })
        console.log(record);
    }
    catch(err){
        res.status(500).json({msg:"Server Error ! Please Try Later" , status:"error"})
        console.log(err)
    }
}

const getData=async(req,res)=>{
    const UID = req.user._id.toString()
    console.log(UID,"UID in get data routes");

    try{
        console.log("Hi")
        var data= await meterModel.find({UID});
        console.log("UID Data" , data)
        if(data){
            res.status(201).json({msg:"Data Found" , data:data})
            console.log(data);
        }
    }
    catch(err){
        console.log("Bye")
        res.status().json({msg:"Data Not Found , Please add new meter" })
        console.log(err);
    }
}

module.exports={
    LoginController,
    RegisterController,
    addMeter,
    getData,
    addPayment
}