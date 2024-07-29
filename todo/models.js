const { DataTypes } =require('sequelize');
const sequelize=require('../src/database/connection');
const User=require('../users/models');
const Todo=sequelize.define(
    'Todo',
    {
        id:{
            type:DataTypes.INTEGER,
            autoIncrement:true,
            primaryKey:true
        },
        title:{
            type:DataTypes.STRING,
            allowNull:false,
        },
        description:{
            type:DataTypes.STRING,
            allowNull:false
        },
        status:{
            type:DataTypes.ENUM,
            values:['ongoing','completed']
        },
        userID:{
            type:DataTypes.INTEGER,
            references:{
                model:User,
                key:'id',
            }
        }
    },
    {
        tableName:"Todos"
    }
);
sequelize.sync().then(()=>{
    console.log('Todo table created sucessfully');
}).catch((error)=>{
    console.log('Todo creation error',error)
});

module.exports=Todo;