'use strict';
const {
  Model,UUID, UUIDV4
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Token extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }

    static async createToken() {
      const validityTime = new Date(Date.now() + 15 * 60 * 1000);
      return await Token.create({ validity_time: validityTime });
    }
  }
  Token.init({
    id: {
      type: UUID,
      primaryKey: true,
      defaultValue: UUIDV4,
      allowNull: false,
    },
    validity_time: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'Token',
  });
  return Token;
};