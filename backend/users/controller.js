const {passwordHash,passwordCheck}=require('../src/utils/passwordUtils');
const {Users,Token}=require('../src/models');
const {registerSchema,loginSchema,passwordChangeSchema}=require('./schema');
const {createToken}=require('../src/utils/authToken');
const {emailTemplateCreate}=require('../src/utils/emailTemplate');
const {sendMail}=require('../src/utils/mail');

const welcomeUser=(req,res)=>{
    res.status(200).json({"message":"user view"});
};

const registerUser= async (req,res)=>{
    try{
        const value=await registerSchema.validateAsync(req.body);
        value.password=passwordHash(value.password);
        try{
            const user=await Users.create(value);
            const token = await Token.createToken();
            const mailOptions=await emailTemplateCreate({user,token});
            sendMail(mailOptions);
            res.status(201).json({"message":"Please check your email for verification link"});
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
const activateUser=async(req,res)=>{
  try{
    const user=await Users.findOne({where:{id:req.params.userId}});
    if(user){
      const token=await Token.findOne({where:{id:req.params.tokenId}});
      if(token){
        if (token.validity_time>new Date(Date.now())){
          user.active=true;
          await user.save();
          res.status(200).json({"message":"Account activated successfully"});
          await token.destroy();
        }else{
          res.status(400).json({"message":"Token Expired"});
        }
      }else{
        res.status(400).json({"message":"Invalid Token"});
        }
    }else{
      res.status(400).json({"message":"Invalid User"});
    }
  }catch(err){
    res.status(400).json({"message":"Invalid User or Token"});
  }
};
module.exports={welcomeUser,registerUser,loginUser,changeUserPassword,activateUser};