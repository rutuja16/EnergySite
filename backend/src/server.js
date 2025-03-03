const express = require('express');
const app = express();

const cors = require('cors');
const bcrypt=require('bcrypt');
const bodyParser= require('body-parser');
const jwt=require('jsonwebtoken');

const router = require('./routes/router.js')
const {connectionWithMongoose} =require("./models/database.js")

// Load .env Enviroment Variables to process.env

require('mandatoryenv').load([
    'PORT',
]);

const { PORT } = process.env;

app.use(cors())
app.use(bodyParser.json())
app.use(express.json())
app.use(express.urlencoded({ extended: false }));



// Instantiate an Express Application
app.use("/Energy",router)


// Open Server on selected Port
app.listen(
    PORT,
    () => console.log('Server listening on port ', PORT)
);