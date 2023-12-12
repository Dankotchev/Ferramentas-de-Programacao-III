import { Router } from 'express';
import UserController from './controller/UserController';
import Authentication from './middleware/Authentication';

const routes = Router();

routes.post('/login', UserController.login);
routes.get('/users/:token', Authentication.validate, UserController.index);
routes.delete('/users/:token/:id', Authentication.validate, UserController.delete);

export default routes;
