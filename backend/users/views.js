const express=require('express');
const router=express.Router();
const {Users} =require('../src/models');
router.get('/',(req,res)=>{
    res.status(200).json({"message":"user view"});
});

router.get('/create',async(req,res)=>{
    try{

        const user=await Users.create({firstName:"benup",lastName:"ghimire",email:"benup211@gmail.com",password:"12345"});
        user.save();
        res.status(200).json({"message":`user ${user.firstName} is created`,"userId":user.id});
    }
    catch(error){
        res.status(400).json({error:error.errors[0].message});
    }
});
router.get('/delete/:uuid',async(req,res)=>{
    try{
        const user=await Users.destroy({where:{id:req.params.uuid}});
        res.status(200).json({"message":"user is deleted"});
    }
    catch(error){
        res.status(400).json({errors:error});
    }
});

module.exports=router;