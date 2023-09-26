import { Router } from 'express';
import UsersController from './controllers/UsersController';
import ProductsController from './controllers/ProductsController';

const routes = Router();

// Rota dos users
/**
 * Rotas para os usuários
*/
routes.post('/users', UsersController.create);
routes.get('/users', UsersController.index);
routes.get('/users/:id', UsersController.show);
routes.delete('/users/:id', UsersController.delete);

/**
 * Rotas para os produtos
 */
routes.post('/products', ProductsController.create);
routes.get('/products', ProductsController.index);
routes.get('/products/:id', ProductsController.show);
routes.delete('/products/:id', ProductsController.delete);

export default routes;
