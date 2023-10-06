const jwt = require('jsonwebtoken')
const { body, validationResult } = require('express-validator');
const adminmiddleware = async (req,res,next)=>{
const token = req.header('admin_token')
if(!token){
 return   res.status(401).json({error:'Invalid token attempting'})
}
try {
    const data = jwt.verify(token,process.env.JWT_SECRET);
    req.admin = data.admin;
    next()
} catch (error) {
   return res.status(401).json({error:"Please authenticate using a valid token"});
}
}

const validateInputs = [
    body('name').notEmpty().withMessage('Name is required'),
    body('email').isEmail().withMessage('Email is required'),
    body('password').isLength({ min: 5 }).withMessage('Password must be at least 5 characters'),
    (req, res, next) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
      next();
    },
  ];
    //Login middleware
    const validateCredentials = [
        body('email').isEmail().withMessage('Email is required'),
        body('password').exists().withMessage('Password must be Inserted'),
        (req, res, next) => {
          const errors = validationResult(req);
          if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
          }
          next();
        },
      ];//Login middleware
      const updateCredential = [
        body('name').notEmpty().withMessage('Name is required'),
        body('email').isEmail().withMessage('Email is required'),
        body('password').isLength({min:5}).withMessage('Password must be 5 characters at least'),
        body('gender').notEmpty().withMessage('gender is required'),
        body('phone').notEmpty().withMessage('Phone is required'),
        (req, res, next) => {
          const errors = validationResult(req);
          if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
          }
          next();
        },
      ];
module.exports = {adminmiddleware,validateInputs,validateCredentials,updateCredential}