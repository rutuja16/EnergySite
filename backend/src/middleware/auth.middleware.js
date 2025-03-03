const { userModel ,connectionWithMongoose } = require("../models/database");
const bcrypt=require('bcrypt');
const jwt=require('jsonwebtoken');


require("dotenv").config();

const encryptPassword=async(req,res,next)=>{
    try{
        const myPlaintextPassword=req.body.password;
        const saltRounds=await bcrypt.genSalt(10);//saltRound means how many time the algorithm has run to hash your password.(any value)
        bcrypt.hash(myPlaintextPassword, saltRounds, function(err, hash) {
            console.log("Encrypted Password" , hash)
            req.body.password=hash;
            next();
        });
    }
    catch(error){
        res.status(500).json({message: "Error While Encrypting password"})
    }
}

const decryptPassword=async(req,res,next)=>{
    try{
        const myPlaintextPassword=req.body.password;
        const saltRounds=await bcrypt.genSalt(10);//saltRound means how many time the algorithm has run to hash your password.(any value)
        bcrypt.hash(myPlaintextPassword, saltRounds, function(err, hash) {
            console.log(hash)
            req.body.password=hash;
            next();
        });
    }
    catch(error){
        res.status(500).json({message: "Error While Encrypting password"})
    }
}

const authenticateMiddleware=(req,res,next)=>{
    //send data in 3 different way: 1.url  2.headers  3.body
    const token=req.headers('Authorization');
    console.log(token);

    if(token){
        // verify a token symmetric(pass token secretkey and function)
    jwt.verify(token, process.env.SECRET, function(err, decoded) {
        if(err){
            res.json({
                message:"Wrong Token or Token mulform"
            })
        }
        else{
            req.user=decoded;
            console.log("Authorized User");
            next();
        }
    });
    }
    else{
        res.status(401).json({
            message:"Forbidden ! You are not allowed to access the resource"
        })
    }
    
}


const authUserToken = async (req, res, next) => {
    connectionWithMongoose();
    const token = req.header("Authorization")?.replace("Bearer ", "");
    //console.log("Token for Auth :",token)
    if(token){
        try {
          //console.log("**********")
          const decoded = jwt.verify(token, process.env.SECRET);
          //console.log("Decoded ID :" ,decoded.id)
          req.user = await userModel.findById(decoded.id).select("-password"); // Attach user to request
          //console.log("user ID :" , req.user._id);
          console.log("Authorized User")
          next();
        } 
        catch (error) {
            console.log(error);
            console.log("Un-uthorized User")
            res.status(401).json({ msg: "Invalid token" });
          }
    }
    else {
        console.log("No Token Available")
        return res.status(401).json({ message: "No token, authorization denied" });
    }
    
  };
module.exports={encryptPassword,decryptPassword , authenticateMiddleware , authUserToken}