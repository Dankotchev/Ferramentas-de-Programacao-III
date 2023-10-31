import 'reflect-metadata';
import { DataSource } from 'typeorm';
import Nivel from './models/Nivel';
import Curso from './models/Curso';
import Disciplina from './models/Disciplina';
import { CreateNivelTable1698779915484 } from './database/migrations/1698779915484-CreateNivelTable';
import { CreateCursoTable1698779925909 } from './database/migrations/1698779925909-CreateCursoTable';
import { CreateDisciplinaTable1698779939189 } from './database/migrations/1698779939189-CreateDisciplinaTable';

export const AppDataSource = new DataSource({
  type: 'mysql',
  host: 'localhost',
  port: 3306,
  username: 'root',
  password: 'ifsp',
  database: 'db_avaliacao',
  synchronize: false,
  logging: false,
  entities: [Nivel, Curso, Disciplina],
  migrations: [
    CreateNivelTable1698779915484,
    CreateCursoTable1698779925909,
    CreateDisciplinaTable1698779939189,
  ],
  subscribers: [],
});
