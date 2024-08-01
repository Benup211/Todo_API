require('dotenv').config();
const jwt=require('jsonwebtoken');

const createToken=(user)=>{
    return jwt.sign(user,process.env.SECRET_KEY,{expiresIn:'7d'});
};

const verifyToken=(req,res,next)=>{
    const token=req.headers['authorization'];
    if(!token){
        return res.status(403).json({"message":"token is required"});
    }
    jwt.verify(token['split'](' ')[1],process.env.SECRET_KEY,(err,user)=>{
        if(err){
            return res.status(403).json({"message":"invalid token"});
        }
        req.user=user;
        next();
    });
}
module.exports={createToken,verifyToken};