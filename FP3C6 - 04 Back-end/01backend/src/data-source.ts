import "reflect-metadata";
import { DataSource } from "typeorm";
import User from "./models/User";
import Product from "./models/Product";

export const AppDataSource = new DataSource({
  type: "mysql",
  host: "localhost",
  port: 3306,
  username: "root",
  password: "ifsp",
  database: "db_aula",
  synchronize: false,
  logging: false,
  entities: [User, Product],
  migrations: [],
  subscribers: [],
});
