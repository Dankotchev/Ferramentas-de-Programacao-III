import { Router } from "express";
import UsersController from "./controllers/UsersController";

const routes = Router();

// Rota dos users
// post /users
routes.post("/users", UsersController.create);

// GET /index ==> Retorna todos os usuários
routes.get("/users", UsersController.index);

export default routes;
