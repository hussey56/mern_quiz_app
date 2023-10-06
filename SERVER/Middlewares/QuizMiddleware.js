 const {body, validationResult} = require('express-validator')
 const validateQuizInputs = [
    body('course_name').notEmpty().withMessage('Course Name is required'),
    body('modular_name').notEmpty().withMessage('Modular Name is required'),
    body('questions').isArray(),
    body('duration').notEmpty().withMessage('Enter a valid duration for exam'),
    (req, res, next) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
      next();
    }
  ];
  module.exports = {validateQuizInputs}