const router=require('express').Router();
const {verifyToken}=require('../src/utils/authToken');
const {welcomeUser,registerUser,loginUser,changeUserPassword,activateUser}=require('./controller');

router.get('/',welcomeUser);
router.post('/register',registerUser);
router.post('/login',loginUser);
router.patch('/changepassword',verifyToken,changeUserPassword);
router.get('/:userId/activate/:tokenId',activateUser)

module.exports=router;