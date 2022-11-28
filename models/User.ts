/* eslint-disable @typescript-eslint/explicit-function-return-type */
import {
  Model,
  Optional,
  Sequelize,
  DataTypes
} from 'sequelize';
import { RefreshToken, TypeModel } from './Refreshtoken';
export interface UserAttributes {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  id: string;
  createdAt: Date;
  updatedAt: Date;
}
export type UserCreationAttributes = Optional<
  UserAttributes,
  'id' | 'createdAt' | 'updatedAt'
>;
class User extends Model<
  UserAttributes,
  UserCreationAttributes
> {
  static initModel(sequelize: Sequelize) {
    this.init(
      {
        createdAt: DataTypes.DATE,
        updatedAt: DataTypes.DATE,
        id: {
          type: DataTypes.UUID,
          primaryKey: true,
          autoIncrement: true,
          defaultValue: DataTypes.UUIDV4
        },
        firstName: DataTypes.STRING,
        lastName: DataTypes.STRING,
        email: DataTypes.STRING,
        password: DataTypes.STRING
      },
      {
        sequelize,
        freezeTableName: true,
        tableName: 'users'
      }
    );
  }
  public id!: string;
  public user!: string;
  public firstName!: string;
  public lastName!: string;
  public password!: string;
  public createdAt!: Date;
  public updatedAt!: Date;
  declare refreshToken: RefreshToken;
  static associate({ models }: TypeModel) {
    this.hasOne(models?.RefreshToken, {
      foreignKey: {
        name: 'userId'
      },
      as: 'refreshToken'
    });
  }
}

export { User };
