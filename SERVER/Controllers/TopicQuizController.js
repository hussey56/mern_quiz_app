const Quiz = require('../Models/Quiz')

const createaquiz =async (req,res)=>{
try {
 const {course_name,modular_name,questions,duration} = req.body
 let Test = await Quiz.findOne({modular_name});
 if(Test){
    return res.status(401).send("This Modular is Already Exist");
    
 }
let qlength = await questions.length
let Adminid = req.admin.id
Test = new Quiz({
    course_name,
    modular_name,
    questions,
    duration ,
    no_of_questions:qlength ,
    created_by:Adminid,
});
const make = await Test.save();
res.send({NEW_Exam:Test});
} catch (error) {
    return res.status(500).send({msg:"Some Internal Error has been Occured",error:error})
}
}
const deletequiz = async (req,res)=>{
   
    try {
        const q_id = req.params.id;
        let quiz = await Quiz.findById(q_id);
        if(!quiz){
            return res.status(401).send("Enter a valid quiz id")
        }
        let deletion = await Quiz.findByIdAndDelete(q_id);
        res.send("The quiz with "+q_id+" has been deleted")

    } catch (error) {
        return res.status(500).send({msg:"Some Internal Error has been Occured",error})
    }
}
const showallquiz = async (req,res)=>{
    try {
    const all = await Quiz.find();
    const totalquizzes = await all.length
    res.send({total_quizzes:totalquizzes,quiz:all})    
    } catch (error) {
        return res.status(500).send({msg:"Some Internal Error has need occured",error})
    }
}
const updateaquiz = async (req,res)=>{
    try {
        const {id,course_name,modular_name,questions,duration} = req.body
        let Updquiz = await Quiz.findById(id);
        if(!Updquiz){
return res.status(401).send('Please Enter a Valid Quiz credentials')
        }
        let Adminid = req.admin.id
        let newQuiz = {};
        if(course_name){
            newQuiz.course_name=course_name
        }
        if(modular_name){
            newQuiz.modular_name=modular_name 
        }
        if(questions){         
            let qnum = await questions.length
            newQuiz.questions=questions 
            newQuiz.no_of_questions=qnum 
        }
        if(duration){
            newQuiz.duration=duration
            newQuiz.created_by = Adminid
        }
     const newOne = await Quiz.findByIdAndUpdate(id,{$set:newQuiz},{new:true});
     res.send(newQuiz)
    } catch (error) {
     return res.status(500).send({msg:"Som Internal Erro has been Occured",error})   
    }
}
const SingleQuiz = async(req,res)=>{
    try {
        // const sid = req.params.id
        const {name} = req.body
        const data = await Quiz.find({modular_name:name});
        if(!data){
            return res.status(401).send('InvALID Credentials of quiz')
        }
        res.json({data})
    } catch (error) {
        return res.status(500).send({msg:"Some Internal Error Has been Occured",error})
    }
}
module.exports = {createaquiz,deletequiz,showallquiz,updateaquiz,SingleQuiz}