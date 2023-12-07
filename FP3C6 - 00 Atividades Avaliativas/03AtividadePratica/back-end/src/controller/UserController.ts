import { Request, Response } from 'express';
import * as Yup from 'yup';
import { AppDataSource } from '../data-source';
import User from '../models/User';

export default {
  // Função privada, atrás do Middleware
  async index(requisicao: Request, resposta: Response) {
    const usuarioRepository = AppDataSource.getRepository(User);
    const usuarios = await usuarioRepository.find();
    resposta.status(200).json(usuarios);
  },

  async delete(requisicao: Request, resposta: Response) {
    const regraDeletar = Yup.object().shape({
      token: Yup.string().required(),
      id: Yup.number().positive().integer().required('Informe um ID'),
    });
    try {
      const usuarioRequisicao = await regraDeletar.validate(requisicao.params, {
        abortEarly: false,
      });

      // Busca se usuário existe
      const usuarioRepository = AppDataSource.getRepository(User);
      const usuario = await usuarioRepository.findOne({
        where: {
          id: usuarioRequisicao.id,
        },
      });

      if (usuario) {
        await usuarioRepository.remove(usuario);
        return resposta.status(202).json(usuario);
      }
      return resposta.status(404).json({ message: 'Usuário não existe' });
    } catch (error: any) {
      console.log(error);
      resposta.status(400).json({ Erro: error.errors });
    }
  },

  // Função pública
  async login(requisicao: Request, resposta: Response) {
    const regras = Yup.object().shape({
      login: Yup.string()
        .min(3, 'Login tem tamanho minimo de 3 caracteres')
        .required('Informe um e-mail'),
      senha: Yup.string()
        .min(3, 'Senha tem tamanho minimo de 3 caracteres')
        .required('Informe uma senha.'),
    });
    try {
      const usuarioRequisicao = await regras.validate(requisicao.body, {
        abortEarly: false,
      });

      // Busca se usuário existe
      const usuarioRepository = AppDataSource.getRepository(User);
      const usuario = await usuarioRepository.findOne({
        where: {
          login: usuarioRequisicao.login,
          senha: usuarioRequisicao.senha,
        },
      });

      if (usuario) {
        return resposta.status(200).json({
          token: process.env.ACCESS_TOKEN_SECRET,
          nome: usuario.nome,
          salario: usuario.salario,
        });
      }
      return resposta.status(500).json({ message: 'Login inválido!' });
    } catch (error: any) {
      console.log(error);
      resposta.status(400).json({ Erro: error.errors });
    }
  },
};
