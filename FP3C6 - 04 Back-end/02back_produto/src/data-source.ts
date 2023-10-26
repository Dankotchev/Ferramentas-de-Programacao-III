import "reflect-metadata";
import { DataSource } from "typeorm";

import Product from "./models/Product";
import { CreateProductTable1698341636734 } from "./database/migrations/1698341636734-CreateProductTable";

export const AppDataSource = new DataSource({
  type: "mysql",
  host: "localhost",
  port: 3306,
  username: "root",
  password: "ifsp",
  database: "db_back_produto",
  synchronize: false,
  logging: false,
  entities: [Product],
  migrations: [CreateProductTable1698341636734],
  subscribers: [],
});
