import 'reflect-metadata';
import { DataSource } from 'typeorm';

import { CreateUser1695154116749 } from './database/migrations/1695154116749-CreateUser';
import { CreateProduct1695755545038 } from './database/migrations/1695755545038-CreateProduct';
import { CreatePostTable1695759541556 } from './database/migrations/1695759541556-CreatePostTable';
import { CreateImageTable1695759550415 } from './database/migrations/1695759550415-CreateImageTable';

import User from './models/User';
import Product from './models/Product';
import Post from './models/Post';
import Image from './models/Image';

export const AppDataSource = new DataSource({
  type: 'mysql',
  host: 'localhost',
  port: 3306,
  username: 'root',
  password: 'ifsp',
  database: 'db_aula',
  synchronize: false,
  logging: false,
  entities: [User, Product, Post, Image],
  migrations: [
    CreateUser1695154116749,
    CreateProduct1695755545038,
    CreatePostTable1695759541556,
    CreateImageTable1695759550415,
  ],
  subscribers: [],
});
