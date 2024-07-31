const bodyParser=require('body-parser');
const setupMiddleware=(app)=>{
    app.use(logger);
    app.use(bodyParser.json());
}
const logger=(req,res,next)=>{
    const currentDate=new Date().toISOString();
    console.log(`request:[${currentDate}] ${req.method} ${req.originalUrl}`);
    const originalJson=res.json;
    res.json=(data)=>{
        console.log(`response:[${currentDate}] ${req.method} ${req.originalUrl} ${res.statusCode}`);
        originalJson.call(res,data);
    }
    next();
}
module.exports=setupMiddleware;