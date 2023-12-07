import 'reflect-metadata';
import { DataSource } from 'typeorm';
import User from './models/User';



export const AppDataSource = new DataSource({
  type: 'mysql',
  host: 'localhost',
  port: 3306,
  username: 'root',
  password: 'ifsp',
  database: 'db_avaliação_3',
  migrationsRun: true,
  synchronize: false,
  logging: false,
  entities: [User],
  migrations: [ ],
  subscribers: [],
});
