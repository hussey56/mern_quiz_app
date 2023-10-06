const mongoose = require('mongoose')
const {Schema} = mongoose
const AdminSchema = new Schema({
a_name:{
    type:String,
    default:'Admin',
    required:true,
    min:4,
},
a_email:{
type:String,
unique:true,
required:true,
},
a_password:{
    type:String,
    required:true,
    min:5
},
a_gender:{
type:String,
default:'Not Selected'    
},
a_phone:{
    type:String,
  default:'Not Selected'    
},
created_at:{
    type:Date,
    default:Date.now()
}
});

module.exports= mongoose.model('admin',AdminSchema)