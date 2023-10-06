const Students = require('../Models/Student')
const bcrypt = require('bcryptjs'); // import bcrypt for usage
const jwt = require('jsonwebtoken'); //importing jwt token

const create = async(req,res)=>{
    try {
   const {name,fname,email,password,fees,exams,course,nic} = req.body  
   let student = await Students.findOne({Student_email:email});
   if(student){
    return res.status(401).send('Email already linked with an account')
   }

const salt = await bcrypt.genSalt(9)
const hashpassword = await bcrypt.hash(password,salt)
student = new Students({
    Student_Name:name,
    Student_Father_name:fname,
    Student_email:email,
    Student_password:hashpassword,
    Student_Fees:fees,
    Student_nic:nic,
    Student_Exams:exams,
    Student_Course:course,
});
     const newstd = await student.save()
     const data ={
        student:{
            id:student.id
        }
     }
   const token = await jwt.sign(data,process.env.JWT_SECRET)
   res.json({token})
    } catch (error) {
        res.status(500).send({error})
    }
}
const StudentsList = async(req,res)=>{
    try {
        const data = await Students.find();
     const total_students = data.length
     res.send({total_students,students:data})   
    } catch (error) {
        res.status(500).send({error})
    }
}
const deleteStudent = async(req,res)=>{
    const stdid = req.params.id
   
try {
    const Std = await Students.findById(stdid)
    if(!Std){
        return res.send({error:"Invalid Duser id"})
    }
    const deletion = await Students.findByIdAndDelete(stdid);
    res.send("The Student has been deleted  of id:"+stdid)
} catch (error) {
    res.status(500).send({error})
}
}
const UpdateStudent = async(req,res)=>{
    const {name,fname,email,password,fees,exams,course,nic} = req.body
try {
 const theid = req.params.id
 const data = await Students.findById(theid);
 if(!data){
    return res.status(401).send("Invalid Student id")
 }
 let newdata = {}   
if(name){
    newdata.Student_Name = name
}
if(fname){newdata.Student_Father_name=fname}
if(email){newdata.Student_email=email}
if(password){
    const salt = await bcrypt.genSalt(9);
    const hashpassword = await bcrypt.hash(password,salt)
    newdata.Student_password = hashpassword
}
if(fees){newdata.Student_Fees = fees}
if(exams){
    newdata.Student_Exams=exams
}
if(course){
    newdata.Student_Course=course
}
if(nic){
    newdata.Student_nic = nic
}
const genUp = await Students.findByIdAndUpdate(theid,{$set:newdata},{new:true});
res.json({newdata})
} catch (error) {
  return  res.status(500).send({error})
}
}
const StudentLogin = async (req,res)=>{
    try {
        const {email,password} = req.body
        let student = await Students.findOne({Student_email:email});
        if(!student){
            return res.json({error:"Invalid Credentials email"})  
        }
        const comparepassword = await bcrypt.compare(password,student.Student_password)
        if(!comparepassword){
            return res.json({error:"Invalid Credentials password"})  
        }
        const data ={
            student:{
                id:student.id,
            },
        }
        const token = await jwt.sign(data,process.env.JWT_SECRET)
        res.json({token,error:false})
    } catch (error) {
        return res.status(500).send({msg:"Some Internal Server Error Has been Occurd",error})
    }
}
const StudentData = async(req,res)=>{
    try {
       const stdId = req.student.id
       let student = await Students.findById(stdId);
       if(!student){
        return res.status(401).send("Invalid Student Crdentials")
       } 
       res.json({student})
    } catch (error) {
       return res.status(500).send({msg:"Internal Server Error has been occured",error}) 
    }
}
const ChangeData = async(req,res)=>{
    try {
        const { student_id, semester, modualar, marks } = req.params;
    
        // Find the student by ID
        const student = await Students.findById(student_id);
    
        if (!student) {
          return res.status(404).json({ message: "Student not found" });
        }
    
        // Find the semester by name
        const semesterIndex = await student.Student_Exams.SemesterStatus.semesters.findIndex(
          (s) => s.name === semester
        );
    
        if (semesterIndex === -1) {
          return res.status(404).json({ message: "Semester not found" });
        }
    
        // Find the modualar by name
        const modualarIndex = await student.Student_Exams.SemesterStatus.semesters[semesterIndex].results.findIndex((m) => m.name === modualar);
    
        if (modualarIndex === -1) {
          return res.status(404).json({ message: "Modualar not found" });
        }
    
        // Find the results array for the modualar
        let results = student.Student_Exams.SemesterStatus.semesters[semesterIndex].results[modualarIndex];
    
        // If the results array doesn't exist, create it
        if (!results) {
          results = [];
          student.Student_Exams.semesters[semesterIndex].modualars[modualarIndex].results = results;
        }
    let f2c = student.Student_Exams.SemesterStatus.semesters[semesterIndex].results[modualarIndex].marks
        // Push the new result onto the array
        // results.push({ name: modualar, marks: Number(marks), status: "cleared" });
    //     const newobj = await {   
    //         Student_Name:'Hassan',
    //       Student_Exams: {
    //         ...student.Student_Exams,
    //       [student.Student_Exams.SemesterStatus.semesters[semesterIndex].results[modualarIndex].marks]:Number(marks)
    //     }
    // }
    // const UpdateIt = await Students.findByIdAndUpdate(student_id,{$set:newobj},{new:true}) 
  const UpdateOne = await Students.updateOne(
    {"_id" : student_id},
    {$set: {
        [`Student_Exams.SemesterStatus.semesters$[semesterIndex].results$[modualarIndex].marks`]:Number(marks)
    }},
    {arrayFilters: [
        {'results.name':modualar}
    ]}
)
        res.json({msg:"Result Updated Succeefully"});
      } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Server error" });
      }
}
module.exports = {create,StudentsList,deleteStudent,UpdateStudent,StudentLogin,StudentData,ChangeData}