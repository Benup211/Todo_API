const routes=(app)=>{
    const userView=require('../../users/views');
    const todoView=require('../../todo/views');
    app.use('/user',userView);
    app.use('/todo',todoView);
}
module.exports=routes