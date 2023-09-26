import { Router } from 'express';
import UsersController from './controllers/UsersController';
import ProductsController from './controllers/ProductsController';

const routes = Router();

// Rota dos users
// post /users
routes.post('/users', UsersController.create);

// GET /index ==> Retorna todos os usuários
routes.get('/users', UsersController.index);

// GET /users/id ==> Pesquisa por id
routes.get('/users/:id', UsersController.show);

/**
 * Rotas para os produtos
 */
routes.post('/products', ProductsController.create);
routes.get('/products', ProductsController.index);
routes.get('/products/:id', ProductsController.show);

export default routes;
