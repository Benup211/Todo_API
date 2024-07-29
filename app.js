require('dotenv').config()
const express=require('express')
const app=express()

//middleware
const middleware=require('./core/middleware');
middleware(app);

//router
const globalroute=require('./core/routes');
globalroute(app);

app.get('/',(req,res)=>{
    res.status(200).json({"message":"hello world"});
});

const port=process.env.PORT;
app.listen(port,()=>{
    console.log(`Server is running in PORT:${port}`);
});