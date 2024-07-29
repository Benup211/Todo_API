const { DataTypes }=require('sequelize');
const sequelize=require('../src/database/connection');

const User=sequelize.define(
    'User',
    {
        id:{
            type:DataTypes.INTEGER,
            primaryKey:true,
            autoIncrement:true,
        },
        firstName:{
            type:DataTypes.STRING,
            allowNull:false,
        },
        lastName:{
            type:DataTypes.STRING,
            allowNull:false
        },
        email:{
            type:DataTypes.STRING,
            allowNull:false,
            unique:{
                args:true,
                msg:"Email already registered"
            },
            validate:{
                isEmail:{
                    msg:"Must be a valid email address",
                }
            }
        },
        password:{
            type:DataTypes.STRING,
            allowNull:{
                args:true,
                msg:"Email cannot be null"
            },
            validate:{
                notEmpty:{
                    msg:"Email is required"
                }
            }
        }
    },
    {
        tableName:"Users",
    },
)
sequelize.sync().then(()=>{
    console.log('User table created sucessfully');
}).catch((error)=>{
    console.log('User creation error',error)
});

module.exports=User;