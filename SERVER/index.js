
const connectDb = require('./db')
const express = require('express')
const cors = require('cors');
const path = require('path');
const app = express() 
const port = process.env.PORT || 7000

require('dotenv').config({ path: path.join(__dirname, '..', '.env') });
app.use(express.json());
app.use(cors());
app.use('/api/data/admin',require('./Routes/Admin'))
app.use('/api/students',require('./Routes/Student'))
app.use('/api/quiz',require('./Routes/Quiz'))


connectDb()
app.listen(port,()=>{
    console.log("Server is Listening on Port:"+port) 
}); 
