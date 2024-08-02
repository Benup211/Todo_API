require('dotenv').config();
const fs = require('fs');
const path = require('path');
const handlebars = require('handlebars');

const templatePath = path.join(__dirname, 'mailTemplate.handlebars');
const templateSource = fs.readFileSync(templatePath, 'utf8');
const template = handlebars.compile(templateSource);

const emailTemplateCreate=async({user,token})=>{
    const name=user.firstName;
    const link=process.env.BASE_URL+"/user/"+user.id+"/activate/"+token.id;
    const option={
        from:process.env.EMAIL,
        to:user.email,
        subject:"Account Verification",
        html:template({name,link})
    };
    return option;
}

module.exports={emailTemplateCreate};