import { Router } from 'express';
import multer from "multer";
import UsersController from './controllers/UsersController';
import ProductsController from './controllers/ProductsController';
import PostController from './controllers/PostController';
import uploadConfig from "./config/upload";

const routes = Router();
const upload = multer(uploadConfig);

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

/**
 * Rotas para o post
 */
routes.get("/posts", PostController.index);
routes.get("/posts/:id", PostController.show);
routes.post("/posts", upload.array("images"), PostController.create);

export default routes;
