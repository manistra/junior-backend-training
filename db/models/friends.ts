'use strict';
import { db } from '../database';


const { Model } = require('sequelize');

export interface FriendsAttributes
{
  id: string,
  first_name: string,
  last_name: string,
  nickname: string,
}

module.exports = (sequelize, DataTypes) =>
{
  class friends extends Model<FriendsAttributes>
  {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models)
    {
      // define association here
    }
  }
  friends.init(
    {
      id: {
        primaryKey: true,
        type: DataTypes.UUID,
      },
      first_name: DataTypes.STRING,
      last_name: DataTypes.STRING,
      nickname: DataTypes.STRING,
    },
    {
      sequelize: db,
      modelName: 'friends',
    }
  );
  return friends;
};
