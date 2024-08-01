const {passwordHash,passwordCheck}=require('../src/utils/passwordUtils');
const {Users}=require('../src/models');
const {registerSchema,loginSchema,passwordChangeSchema}=require('./schema');
const {createToken}=require('../src/utils/authToken');
const { BelongsToMany } = require('sequelize');

const welcomeUser=(req,res)=>{
    res.status(200).json({"message":"user view"});
};

const registerUser= async (req,res)=>{
    try{
        const value=await registerSchema.validateAsync(req.body);
        value.password=passwordHash(value.password);
        try{
            const user=await Users.create(value);
            res.status(201).json({"message":"user registered successfully"});
        }catch(err){
            res.status(400).json({"message":"Email already registered"});
        }
    }
    catch(err){
        res.status(400).json({"message":err.message});
    }
};

const loginUser=async (req,res)=>{
  try{
    const value=await loginSchema.validateAsync(req.body);
    const user=await Users.findOne({where:{email:value.email}});
    if(user){
      if(passwordCheck(value.password,user.password)){
        const token=createToken({id:user.id,email:user.email});
        res.status(200).json({"message":"login successful","token":token});
      }else{
        res.status(400).json({"message":"Invalid Email or Password"});
      }
    }else{
      res.status(400).json({"message":"user not found"});
    }
  }catch(err){
    res.status(400).json({"message":err.message});
  }
};

const changeUserPassword=async(req,res)=>{
  try{
    const value=await passwordChangeSchema.validateAsync(req.body);
    const user=await Users.findOne({where:{id:req.user.id}});
    if(user){
      if(passwordCheck(value.oldPassword,user.password)){
        user.password=passwordHash(value.password);
        await user.save();
        res.status(200).json({"message":"password changed successfully"});
      }else{
        res.status(400).json({"message":"Invalid Email or Password"});
      }
    }else{
      res.status(400).json({"message":"user not found"});
    }
  }catch(err){
    res.status(400).json({"message":err.message});
  }
};
module.exports={welcomeUser,registerUser,loginUser,changeUserPassword};