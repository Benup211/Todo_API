const express=require('express');
const router=express.Router();
const Todo=require('./models');

router.get('/',async(req,res)=>{
    const todos=await Todo.findAll();
    if (todos.length==0){
        const todo=await Todo.create({title:"t1",description:"lorem",status:"ongoing",userID:1});
        res.status(200).json({"todos":todo})
    }
    res.status(200).json({"todos":todos})
});
router.get('/:id',async(req,res)=>{
    const todo=await Todo.findByPk(req.params.id);
    res.status(200).json({"todo":todo})
});
module.exports=router