import Sequelize from 'sequelize';

import * as databaseConfig from '../config/config';
import { Product } from './Product';
import { RefreshToken } from './Refreshtoken';
import { User } from './User';

class Database {
  public connection!: Sequelize.Sequelize;

  constructor() {
    this.init();
  }

  init(): void {
    this.connection = new Sequelize.Sequelize(
      databaseConfig.database as string,
      databaseConfig.username as string,
      databaseConfig.password as string,
      databaseConfig as any
    );
  }
}

const database: Database = new Database();
User.initModel(database.connection);
Product.initModel(database.connection);
RefreshToken.initModel(database.connection);
RefreshToken.associate({
  models: database.connection.models
});
User.associate({ models: database.connection.models });

export { database, User, Product, RefreshToken };
