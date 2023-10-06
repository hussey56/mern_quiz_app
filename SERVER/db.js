const mongoose = require('mongoose');
const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '..', '.env') });
const URI = process.env.MONGO_URI;
const connectDb = ()=>{
    mongoose.connect(URI,()=>{
        console.log("Connected with Database")
    }); 
}
module.exports = connectDb;