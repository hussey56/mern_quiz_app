const mongoose = require('mongoose');
const {Schema} = mongoose
const QuizSchema = new Schema({
 course_name:{
    type:String,
    required:true,   
 },  
modular_name:{
    type:String,
    required:true,
    unique:true,
},
no_of_questions:{
    type:String,
    required:true,
},
questions:{
    type:Array,
    required:true,
},
duration:{
    type:String,
    required:true,
},
created_by:{
    type:String,
    required:true,
},  
created_at:{
    type:Date,
default:Date.now()
}
});
module.exports = mongoose.model('Quiz',QuizSchema)