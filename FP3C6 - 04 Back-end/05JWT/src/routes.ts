import { Router } from "express";
import usuarioController from "./controller/UsuarioController";
import authentication from "./middleware/authentication";
import UsuarioController from "./controller/UsuarioController";

const routes = Router();

routes.post("/login", usuarioController.login);

// Rota protegida, primeiro acessa o middleware, caso válido o acesso, chama a proximaFunção
//  index
routes.get("/users", authentication.validate, UsuarioController.index);

export default routes;
