const {body, validationResult} = require('express-validator')
const jwt = require('jsonwebtoken')
const validateInputs = [
    body('name').notEmpty().withMessage('Name is required'),
    body('fname').notEmpty().withMessage('Father Name is required'),
    body('email').isEmail().withMessage('Enter a valid email'),
    body('password').isLength({min:5}),
    body('fees').notEmpty().withMessage('ENTER THE FEES FOR STUEDNT'),
    (req, res, next) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
      next();
    },
  ];
  const studentmiddleware = async (req,res,next)=>{
    const token = req.header('student_token')
    if(!token){
     return   res.status(401).json({error:'Invalid token attempting'})
    }
    try {
        const data = jwt.verify(token,process.env.JWT_SECRET);
        req.student = data.student;
        next()
    } catch (error) {
       return res.status(401).json({error:"Please authenticate using a valid token"});
    }
    }
  module.exports = {validateInputs,studentmiddleware}