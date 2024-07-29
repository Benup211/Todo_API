require('dotenv').config()
const {Sequelize,DataTypes}=require('sequelize');
const debug=process.env.DEBUG||"testing";
const databaseConnection=require('./config.json')[debug];
const sequelize=new Sequelize(databaseConnection.database,databaseConnection.username,databaseConnection.password,databaseConnection);
module.exports=sequelize;