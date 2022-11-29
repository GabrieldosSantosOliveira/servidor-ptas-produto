import {
  ForeignKey,
  Model,
  Optional,
  Sequelize,
  DataTypes
} from 'sequelize';

import { User } from './User';
export type TypeModel = Pick<Sequelize, 'models'>;
interface RefreshTokenAttributes {
  id: string;
  userId: ForeignKey<string>;
  expiresIn: number;
}

type RefreshTokenCreationAttributes = Optional<
  RefreshTokenAttributes,
  'id'
>;
class RefreshToken extends Model<
  RefreshTokenAttributes,
  RefreshTokenCreationAttributes
> {
  static initModel(sequelize: Sequelize) {
    this.init(
      {
        expiresIn: DataTypes.INTEGER,
        userId: {
          type: DataTypes.UUID,
          allowNull: false,
          references: {
            model: User,
            key: 'id'
          }
        },
        id: {
          allowNull: false,
          type: DataTypes.UUID,
          primaryKey: true,
          defaultValue: DataTypes.UUIDV4
        }
      },
      {
        sequelize,
        freezeTableName: true,
        tableName: 'refreshTokens',
        createdAt: false,
        updatedAt: false
      }
    );
  }
  declare id: number;

  declare expiresIn: number;
  declare userId: ForeignKey<User['id']>;
  static associate({ models }: TypeModel) {
    this.belongsTo(models?.User, {
      foreignKey: 'userId',
      as: 'user'
    });
  }
}

export { RefreshToken };
