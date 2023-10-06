 const Admin = require('../Models/Admin')
 const bcrypt = require('bcryptjs'); // import bcrypt for usage
 const jwt = require('jsonwebtoken'); //importing jwt token

const newadmin = async (req,res)=>{
try {
      const {name,email,password,gender,phone} = req.body;
let admin = await Admin.findOne({a_email:email});
if(admin){
    return res.status(400).send({error:'This Email is already taken'})
}

const salt = await bcrypt.genSalt(9);
const hpassword = await bcrypt.hash(password,salt);
admin = new Admin({
      a_name:name,
      a_email: email,
      a_gender:gender,
      a_phone:phone,
      a_password:hpassword
});
const save = await admin.save()
const data = {
      admin:{
            id:admin.id,
      },
}
const token = jwt.sign(data,process.env.JWT_SECRET)

res.json({token}); 

     
} catch (error) {
  return  res.status(500).send({error})
}
}
const readAdmin = async (req,res)=>{
      try {
         let Adminid = req.admin.id
         const dataAdmin = await Admin.findById(Adminid).select('-a_password')
         if(!dataAdmin){
            res.send(invalid);
        }
        res.send(dataAdmin);
      } catch (error) {
            return res.status(500).send('Some thing went wrong on ther server'+error)
      }
}
const loginAdmin =async (req,res)=>{

      const {email,password} = req.body
try {
    let admin = await Admin.findOne({a_email:email});
    if(!admin){
return res.status(400).json({error:"Invalid Credentials"})
    }
    const comparePassword = await bcrypt.compare(password,admin.a_password);
    if(!comparePassword){
      return res.status(400).json({error:"Invalid Credentials"})
    }
    const data = {
      admin:{
            id:admin.id
      },
    }
const token = jwt.sign(data,process.env.JWT_SECRET)
res.json({token,error:false})
} catch (error) {
     res.status(500).send({error})    
}
}
const updateAdmin = async(req,res)=>{
      const {name,email,password,gender,phone} = req.body
      let Adminid = req.admin.id
      const dataAdmin = await Admin.findById(Adminid)
      if(!dataAdmin){
         res.send(invalid);
     }
      try {
            let UpdatedAdmin = {}
            if(name){
                  UpdatedAdmin.a_name = name
            }
     if(password){
      const salt = await bcrypt.genSalt(9);
const hpassword = await bcrypt.hash(password,salt);
UpdatedAdmin.a_password = hpassword
     }
     if(email){
      UpdatedAdmin.a_email = email
     }
     if(gender){
      UpdatedAdmin.a_gender = gender;
     }
     if(phone){
      UpdatedAdmin.a_phone = phone
     }
     let admnew = await Admin.findByIdAndUpdate(Adminid,{$set:UpdatedAdmin},{new:true});
     res.json(admnew)
      } catch (error) {
            return  res.status(500).send({error})    
      }
}
const deleteAdmin = async(req,res)=>{
   
      try {
            let Adminid = req.params.id
            const dataAdmin = await Admin.findById(Adminid)
            if(!dataAdmin){
               res.send(invalid);
           }
           const deletead = await Admin.findByIdAndDelete(Adminid)  
           res.json({success:"Admin Has been delete"})
      } catch (error) {
            return  res.status(500).send({error})      
      }
}
module.exports = {newadmin,readAdmin,loginAdmin,updateAdmin,deleteAdmin}