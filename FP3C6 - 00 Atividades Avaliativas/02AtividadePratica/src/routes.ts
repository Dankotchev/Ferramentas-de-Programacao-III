import { Router } from 'express';
import CursoController from './controller/CursoController';
import DisciplinaController from './controller/DisciplinaController';

const routes = Router();

routes.get('/curso/nivel/:nivel', CursoController.findByNivel);
routes.get('/curso/nome/:nome', CursoController.findByNome);
routes.get('/disciplinas/:nome', DisciplinaController.findByNome);
routes.delete('/curso/:codigo', CursoController.delete);
routes.post('/disciplinas', DisciplinaController.create);

export default routes;
