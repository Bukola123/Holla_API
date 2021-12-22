 const express = require('express');
 const app = express();
 require('dotenv').config();
 
 const PORT = process.env.PORT || 8000;
 app.use(express.json());

 const connectDB = require('./config/db');

 connectDB();



 app.listen(PORT, () =>{
     console.log(`server running in port ${PORT}`)
 })