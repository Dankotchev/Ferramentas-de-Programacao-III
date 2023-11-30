import { Request, Response } from 'express';
const jwt = require('jsonwebtoken');
import * as Yup from 'yup';
import { AppDataSource } from '../data-source';
import Usuario from '../models/Usuario';

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

const regras = Yup.object().shape({
  email: Yup.string()
    .email('Informe um e-mail válido')
    .required('Informe um e-mail'),
  senha: Yup.string().required('Informe uma senha.'),
});

export default {
  // Função privada, atrás do Middleware
  async index(requisicao: Request, resposta: Response) {
    const usuarioRepository = AppDataSource.getRepository(Usuario);
    const usuarios = usuarioRepository.find();
    resposta.status(200).json(usuarios);
  },

  // Função pública
  async login(requisicao: Request, resposta: Response) {
    try {
      const usuarioRequisicao = await regras.validate(requisicao.body, {
        abortEarly: false,
      });

      // Busca se usuário existe
      const usuarioRepository = AppDataSource.getRepository(Usuario);
      const usuario = await usuarioRepository.find({
        where: {
          email: usuarioRequisicao.email,
          senha: usuarioRequisicao.senha,
        },
      });

      if (usuario) {
        // Construção do payload com o email do usuário
        const payload = {
          email: usuarioRequisicao.email,
        };

        // Criação do token, assinado com o payload e token secreto
        const token = jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, {
          expiresIn: 300, // expira em 5 minutos
        });

        // Retorno do token do usuário
        return resposta.status(200).json({
          token: token,
        });
      }
      return resposta.status(500).json({ message: 'Login inválido!' });
    } catch (error: any) {
      console.log(error);
      resposta.status(400).json({ Erro: error.errors });
    }
  },
};
