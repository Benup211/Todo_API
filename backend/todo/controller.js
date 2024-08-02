const {Todos}=require('../src/models');

const todoCreate=async(req,res)=>{
    try{
        const {title}=req.body;
        if(!title){
            return res.status(400).json({"message":"Todo Title is required"});
        }
        const todo=await Todos.create({title,userId:req.user.id});
        return res.status(201).json({"message":"Todo Created Successfully","todo":todo});
    }catch(err){
        return res.status(500).json({"message":"Internal Server Error"});
    }
};

const todoList=async(req,res)=>{
    try{
        const todoList=await Todos.findAll({where:{userId:req.user.id}});
        return res.status(200).json({"Todos":todoList});
    }catch(err){
        return res.status(500).json({"message":"Internal Server Error"});
    }
};

const todoDelete=async(req,res)=>{
    try{
        const id=req.params.id;
        const todo=await Todos.findOne({where:{id,userId:req.user.id}});
        if(!todo){
            return res.status(404).json({"message":"Todo Not Found"});
        }
        await todo.destroy();
        return res.status(200).json({"message":"Todo Deleted Successfully"});
    }catch(err){
        return res.status(500).json({"message":"Internal Server Error"});
    }
};

const todoUpdate=async(req,res)=>{
    try{
        const id=req.params.id;
        const {status}=req.body;
        if(!status){
            return res.status(400).json({"message":"Todo status is required"});
        }
        const todo=await Todos.findOne({where:{id,userId:req.user.id}});
        if(!todo){
            return res.status(404).json({"message":"Todo Not Found"});
        }
        todo.status=status;
        await todo.save();
        return res.status(200).json({"message":"Todo Updated Successfully","todo":todo});
    }catch(err){
        return res.status(500).json({"message":"Internal Server Error"});
    }
};

const todoOngoing=async(req,res)=>{
    try{
        const todoList=await Todos.findAll({where:{userId:req.user.id,status:"ongoing"}});
        return res.status(200).json({"Todos":todoList});
    }catch(err){
        return res.status(500).json({"message":"Internal Server Error"});
    }
};

const todoCompleted=async(req,res)=>{
    try{
        const todoList=await Todos.findAll({where:{userId:req.user.id,status:"completed"}});
        return res.status(200).json({"Todos":todoList});
    }catch(err){
        return res.status(500).json({"message":"Internal Server Error"});
    }
};

module.exports={todoList,todoCreate,todoDelete,todoUpdate,todoOngoing,todoCompleted};