import { Router } from 'express';
import ProductsController from './controllers/ProductsController';


const routes = Router();


/**
 * Rotas para os produtos
 */
routes.post('/products', ProductsController.create);
routes.get('/products', ProductsController.index);
routes.get('/products/:codigo', ProductsController.show);
routes.get("/products/name/:name", ProductsController.findByName);
routes.get("/products/price/:price", ProductsController.findByPrice);
routes.delete('/products/:codigo', ProductsController.delete);
routes.put('/products/:codigo', ProductsController.update);


export default routes;
