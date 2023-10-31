import { Router } from 'express';
import CursoController from './controller/CursoController';
import Disciplina from './models/Disciplina';
import DisciplinaController from './controller/DisciplinaController';



const routes = Router();


/**
 * Rotas para os produtos
 */
// routes.post('/products', ProductsController.create);
// routes.get('/products', ProductsController.index);
// routes.get('/products/:codigo', ProductsController.show);
// routes.get("/products/name/:name", ProductsController.findByName);
// routes.get("/products/price/:price", ProductsController.findByPrice);
// routes.delete('/products/:codigo', ProductsController.delete);
// routes.put('/products/:codigo', ProductsController.update);

routes.get('/curso/nivel/:nivel', CursoController.findByNivel)
routes.get('/curso/nome/:nome', CursoController.findByNome)
routes.get('/disciplinas/:nome', DisciplinaController.findByNome)
routes.delete('/curso/:codigo', CursoController.delete)
routes.post('/disciplinas', DisciplinaController.create)


export default routes;
