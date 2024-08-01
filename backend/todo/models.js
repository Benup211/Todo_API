'use strict';
const {
  Model,UUID, UUIDV4
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Todos extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({Users}) {
      this.belongsTo(Users, {
        foreignKey: 'userId',
      })
    }
  }
  Todos.init({
    id: {
      type:UUID,
      defaultValue:UUIDV4,
      primaryKey: true
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    status: {
      type: DataTypes.ENUM,
      values: ['ongoing', 'completed'],
      defaultValue: 'ongoing',
    },
    userId: {
      type: UUID,
      allowNull: false,
    }
  }, {
    sequelize,
    modelName: 'Todos',
  });
  return Todos;
};