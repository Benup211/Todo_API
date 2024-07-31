require('dotenv').config();
const express=require('express');
const app=express();


//middleware
const middleware=require('./src/middleware/middleware');
middleware(app);

//router
const globalroute=require('./src/routes/routes');
globalroute(app);

//database
const {sequelize}=require('./src/models/index');

app.get('/',async(req,res)=>{
    res.status(200).json({"message":"Hello to Todo Application"});
});

const port=process.env.PORT||3000;
app.listen(port,async()=>{
    console.log(`Server is running in http://localhost:${port}`);
    try{
        await sequelize.authenticate();
        console.log('Database connected!');
        console.log('Database Synced!');
    }catch(err){
        console.error('Database connection failed!');
        console.error(err);
    }
});