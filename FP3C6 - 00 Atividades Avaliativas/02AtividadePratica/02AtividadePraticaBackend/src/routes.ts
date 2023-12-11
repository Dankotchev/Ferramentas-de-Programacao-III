import { Router } from 'express';
import CursoController from './controller/CursoController';
import DisciplinaController from './controller/DisciplinaController';
import UsuarioController from './controller/UsuarioController';
import Authentication from './middleware/Authentication';

const routes = Router();

routes.get('/curso/nivel/:nivel', CursoController.findByNivel);
routes.get('/curso/nome/:nome', CursoController.findByNome);
routes.get('/curso', CursoController.index);
routes.post('/curso', CursoController.create);
routes.put('/curso/:codigo', CursoController.update);
routes.delete('/curso/:codigo', CursoController.delete);

routes.get('/disciplinas/:nome', DisciplinaController.findByNome);
routes.post('/disciplinas', DisciplinaController.create);
routes.delete('/disciplinas/:codigo', DisciplinaController.delete);

routes.post('/login', UsuarioController.login);
routes.get('/usuario', Authentication.validate ,UsuarioController.index);

export default routes;
