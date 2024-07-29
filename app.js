require('dotenv').config();
const express=require('express');
const app=express();

//middleware
const middleware=require('./src/middleware/middleware');
middleware(app);

//router
const globalroute=require('./src/routes/routes');
globalroute(app);

app.get('/',async(req,res)=>{
    res.status(200).json({"message":"Hello to Todo Application"});
});

const port=process.env.PORT||3000;
app.listen(port,()=>{
    console.log(`Server is running in PORT:${port}`);
});