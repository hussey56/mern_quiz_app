const mongoose = require('mongoose');
const {Schema} = mongoose
const StudentSchema = new Schema({
    Student_Name:{
        type:String,
        required:true,
    },
    Student_Father_name:{
        type:String,
        required:true,
    },
    Student_nic:{
        type:Number,
        required:true,
    },
    Student_email:{
       type:String,
       required:true,
       unique:true, 
    },
    Student_password:{
        type:String,
        required:true,
        min:5
    },
    Student_Exams:{
        type:Schema.Types.Mixed,
        required:true,
        default:{
           exams:{},
           marks:{},
            cleared:{}
        },
    },
    Student_Course:{
        type:String,
        required:true,
       
    },
    Student_Fees:{
        type:Number,
        required:true,
    },
    Student_Registration_Date:{
        type:Date,
        default:Date.now(),
    },
});
module.exports = mongoose.model('Student',StudentSchema)