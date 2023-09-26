import 'reflect-metadata';
import { DataSource } from 'typeorm';

import { createUser1695154116749 } from './database/migrations/1695154116749-create_user';
import { createProduct1695755545038 } from './database/migrations/1695755545038-create_product';
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
    createUser1695154116749,
    createProduct1695755545038,
    CreatePostTable1695759541556,
    CreateImageTable1695759550415,
  ],
  subscribers: [],
});
