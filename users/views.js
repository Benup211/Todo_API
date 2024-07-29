const express=require('express');
const router=express.Router();
const User=require('./models');
router.get('/',(req,res)=>{
    res.status(200).json({"message":"user view"});
});

router.get('/create',async(req,res)=>{
    try{

        const user=await User.create({id:1,firstName:"benup",lastName:"ghimire",email:"benup211@gmail.com",password:"12345"});
        user.save();
        res.status(200).json({"message":`user ${user.firstName} is created`});
    }
    catch(error){
        res.status(400).json({errors:error.errors});
    }
});

module.exports=router;