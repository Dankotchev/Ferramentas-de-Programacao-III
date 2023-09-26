import { Request, Response } from 'express';
import { AppDataSource } from "../data-source";
import User from '../models/User';

export default {
  // Cada função separada por ,
  async create(requisicao: Request, resposta: Response) {
    // desestruturar o corpo da requisição (JSON)
    console.log(requisicao.body);
    const { nome, salario } = requisicao.body;

    // getRepository vem do typerform, e passa a entidade (User)
    const userRepository = AppDataSource.getRepository(User);

    // criar um objeto
    const user = userRepository.create({
      nome,
      salario,
    });

    // salvar no banco
    await userRepository.save(user);

    // resposta com código de status de secusse de create (201)
    //  e o objeto criado em json
    return resposta.status(201).json(user);
  },

  // Outra função
  // Lista todos os usuários
  async index(requisicao: Request, resposta: Response) {
    const userRepository = AppDataSource.getRepository(User);
    const users = await userRepository.find();
    resposta.json(users);
  },

  async show(requisicao: Request, resposta: Response) {
    const { id } = requisicao.params;
    const userRepository = AppDataSource.getRepository(User);
    const user = await userRepository.findOneByOrFail({id: +id,});
    resposta.json(user);
  },

  async delete(requiscao: Request, resposta: Response) {
    const { id } = requiscao.params;
    const userRepository = AppDataSource.getRepository(User);

    const user = await userRepository.findOneBy({
      id: +id,
    });

    if (user) {
      await userRepository.remove(user);
      return resposta.status(204).json(user);
    }
    resposta.status(404).json();

  },
};
