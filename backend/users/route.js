const router=require('express').Router();
const {verifyToken}=require('../src/utils/authToken');
const {welcomeUser,registerUser,loginUser,changeUserPassword}=require('./controller');

router.get('/',welcomeUser);
router.post('/register',registerUser);
router.post('/login',loginUser);
router.patch('/changepassword',verifyToken,changeUserPassword);

module.exports=router;