/* eslint-disable @typescript-eslint/explicit-function-return-type */
import {
  Model,
  Optional,
  DataTypes,
  Sequelize
} from 'sequelize';
interface ProductAttributes {
  title: string;
  priceForCents: number;
  description: string;
  image: string;
  readonly id: number;
  readonly createdAt: Date;
  readonly updatedAt: Date;
}
type ProductCreationAttributes = Optional<
  ProductAttributes,
  'id' | 'createdAt' | 'updatedAt'
>;
class Product extends Model<
  ProductAttributes,
  ProductCreationAttributes
> {
  static initModel(sequelize: Sequelize) {
    this.init(
      {
        title: DataTypes.STRING,
        priceForCents: DataTypes.INTEGER,
        description: DataTypes.STRING,
        image: DataTypes.STRING,
        createdAt: DataTypes.DATE,
        updatedAt: DataTypes.DATE,
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
        tableName: 'products'
      }
    );
  }
  public id!: number;

  public title!: string;

  public priceForCents!: number;

  public description!: string;

  public image!: string;

  public readonly createdAt!: Date;

  public readonly updatedAt!: Date;
}

export { Product };
