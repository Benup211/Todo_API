const routes=(app)=>{
    const userView=require('../../users/route');
    const todoView=require('../../todo/route');
    app.use('/user',userView);
    app.use('/todo',todoView);
}
module.exports=routes