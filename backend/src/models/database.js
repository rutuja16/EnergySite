
const mongoose=require('mongoose');

const connectionWithMongoose=async ()=>{
    try{
        const connection=await mongoose.connect(process.env.DB_CONN);
        console.log("connected to Energy Database")
        return connection;
    } catch(e){
        console.error("error while connecting DB",e)
    }
}

const userSchema=mongoose.Schema({
    name:{type:String,require:true} ,
    email:{type:String,require:true},
    password:{type:String,require:true},
    userType:{type:String,require:true},
    secreatKey:{type:String,require:true},
})


const userModel=mongoose.model("User", userSchema)

const MeterReadingSchema = new mongoose.Schema({
    UID:{ type: mongoose.Schema.Types.ObjectId, ref: "User" , required: true  },
    name:{type:String,require:true} ,
    reading: {type:Number,require:true} ,
    charges: {type:Number,require:true} ,
    amount: {type:Number,require:true} ,
    date: { type: Date, default: Date.now  , required: true },
    status:{type:String,enum: ["Paid", "Due"], require:true},
    dueDate:{ type: Date, required: true }
},{ timestamps: true });

const meterModel =mongoose.model("MeterReadingModel",MeterReadingSchema );


const paymentSchema = new mongoose.Schema({
    bill_id: { type: mongoose.Schema.Types.ObjectId , ref:"MeterReadingModel" , required:true },
    upi_id:{type:String,require:true} ,
    mpin: {type:Number,require:true} ,
    amount:{type:Number,require:true} ,
    payMode:{type:String,require:true},
    status:{type:String,require:true},
}, {timestamps:true});

const paymentModel =mongoose.model("PaymentModel", paymentSchema );

module.exports={connectionWithMongoose  ,userModel , meterModel , paymentModel}
