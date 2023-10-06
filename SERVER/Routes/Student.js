const express = require('express')
const {validateInputs,studentmiddleware} = require('../Middlewares/StudentsMiddleware')
const {adminmiddleware}=require('../Middlewares/AdmindataMiddlewre')
const router = express.Router();
const {create,StudentsList,deleteStudent,UpdateStudent,StudentLogin,StudentData,ChangeData} = require('../Controllers/StudentController') 



router.route('/createstudents').get(adminmiddleware,validateInputs,create)
router.route('/seeallstudents').get(adminmiddleware,StudentsList)
router.route('/deletestudent/:id').delete(adminmiddleware,deleteStudent)
router.route('/updatestudent/:id').put(adminmiddleware,UpdateStudent)
router.route('/studentlogin').post(StudentLogin)
router.route('/studentdata').get(studentmiddleware,StudentData);
router.route('/exam/:student_id/:semester/:modualar/:marks').put(ChangeData)
module.exports = router