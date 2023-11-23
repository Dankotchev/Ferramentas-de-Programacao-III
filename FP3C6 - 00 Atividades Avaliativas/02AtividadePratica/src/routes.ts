import { Router } from 'express';
import CursoController from './controller/CursoController';
import DisciplinaController from './controller/DisciplinaController';

const routes = Router();

routes.get('/curso/nivel/:nivel', CursoController.findByNivel);
routes.get('/curso/nome/:nome', CursoController.findByNome);
routes.get('/curso', CursoController.index);
routes.post('/curso', CursoController.create);
routes.delete('/curso/:codigo', CursoController.delete);

routes.get('/disciplinas/:nome', DisciplinaController.findByNome);
routes.post('/disciplinas', DisciplinaController.create);
routes.delete('/disciplinas/:codigo', DisciplinaController.delete);

export default routes;
