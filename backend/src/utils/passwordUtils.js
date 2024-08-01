const bcrypt=require('bcryptjs');

const passwordHash=(password)=>{
    const salt=bcrypt.genSaltSync(10);
    const hashPassword= bcrypt.hashSync(password,salt);
    return hashPassword;
};
const passwordCheck=(password,hashPassword)=>{
    return bcrypt.compareSync(password,hashPassword);
}
module.exports={passwordHash,passwordCheck};