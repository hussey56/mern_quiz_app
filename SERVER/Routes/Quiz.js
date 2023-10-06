const express = require('express')
const router = express.Router();
const {validateQuizInputs} = require('../Middlewares/QuizMiddleware')
const {createaquiz,deletequiz,showallquiz,updateaquiz,SingleQuiz} = require('../Controllers/TopicQuizController')
const {adminmiddleware} = require('../Middlewares/AdmindataMiddlewre')
const {studentmiddleware} = require('../Middlewares/StudentsMiddleware')
router.route('/creataquiz').get(adminmiddleware,validateQuizInputs,createaquiz);
router.route('/deleteaquiz/:id').delete(adminmiddleware,deletequiz);
router.route('/showallquiz').get(adminmiddleware,showallquiz);
router.route('/updateaquiz').put(adminmiddleware,updateaquiz);
router.route('/singlequiz').post(studentmiddleware,SingleQuiz);

module.exports = router 