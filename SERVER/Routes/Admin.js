const express = require('express');
const router = express.Router();

const {newadmin,readAdmin,loginAdmin,updateAdmin,deleteAdmin} = require('../Controllers/AdminController')
const {adminmiddleware,validateInputs,validateCredentials,updateCredential}= require('../Middlewares/AdmindataMiddlewre')


 
router.route('/create').post(validateInputs,newadmin)
router.route('/admindata').get(adminmiddleware,readAdmin)
router.route('/loginadmin').post(validateCredentials,loginAdmin);
router.route('/updateadmin').put(updateCredential,adminmiddleware,updateAdmin)
router.route('/deleteadmin/:id').delete(deleteAdmin)
module.exports = router