const express=require('express');
const router=express.Router();
const {Todos} =require('../src/models');

router.get('/',async(req,res)=>{
    const todos=await Todos.findAll();
    if (todos.length==0){
        const todo=await Todos.create({title:"t1",description:"lorem",status:"ongoing",userId:"86c73bcd-94e6-43eb-9462-a457390ef40e"});
        res.status(200).json({"todos":todo})
    }else{
        res.status(200).json({"todos":todos})
    }
});
router.get('/:id',async(req,res)=>{
    const todo=await Todos.findByPk(req.params.id);
    res.status(200).json({"todo":todo})
});
module.exports=router;