import { Request, Response } from 'express';
// import * as jwt from "jsonwebtoken";
const jwt = require('jsonwebtoken');

const usuarios = [
  {
    email: 'user1@email.com',
    senha: 'user1',
  },
  {
    email: 'user2@email.com',
    senha: 'user2',
  },
];

export default {

  // Função privada, atrás do Middleware
  async index(requisicao: Request, resposta: Response) {
    resposta.status(200).json(usuarios);
  },

  // Função pública
  async login(requisicao: Request, resposta: Response) {
    //desestruturacao
    const { email, senha } = requisicao.body;

    //Verificação somente para testes (substituir)
    const user = usuarios.find((user) => {
      if (user.email === email && user.senha === senha) {
        return user;
      }
    });

    if (user) {
      const payload = {
        email,
      };

      const token = jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, {
        expiresIn: 300, // expira em 5 minutos
      });

      return resposta.status(200).json({
        token: token,
      });
    }
    return resposta.status(500).json({ message: 'Login inválido!' });
  },
};
