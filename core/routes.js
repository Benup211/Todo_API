const routes=(app)=>{
    const todoView=require('../todo/views');
    const userView=require('../users/views');
    app.use('/todo',todoView);
    app.use('/user',userView);
}
module.exports=routes