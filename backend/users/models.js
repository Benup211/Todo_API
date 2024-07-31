'use strict';
const {
  Model, UUID, UUIDV4
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Users extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({Todos}) {
      this.hasMany(Todos, {
        foreignKey: 'userId'});  
    }
  }
  Users.init({
    id: {
      type: UUID,
      primaryKey: true,
      defaultValue: UUIDV4,
      allowNull: false,
    },
    firstName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: false
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: {
        args: true,
        msg: "Email already registered"
      },
      validate: {
        isEmail: {
          msg: "Must be a valid email address",
        }
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: {
        args: true,
        msg: "Email cannot be null"
      },
      validate: {
        notEmpty: {
          msg: "Email is required"
        }
      }
    }
  }, {
    sequelize,
    modelName: 'Users',
  });
  return Users;
};