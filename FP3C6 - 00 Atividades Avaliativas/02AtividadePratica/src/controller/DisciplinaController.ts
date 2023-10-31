import { Request, Response } from 'express';
import { Like } from 'typeorm';
import { AppDataSource } from '../data-source';
import Disciplina from '../models/Disciplina';

export default {
  async findByNome(requisicao: Request, resposta: Response) {
    const { nome } = requisicao.params;
    const disciplinaRepository = AppDataSource.getRepository(Disciplina);

    const disciplina = await disciplinaRepository.find({
      // select: {
      //   nome: true,
      //   codigo: true,
      //   curso: {
      //     nivelCodigo: {
      //       nome: true,
      //       codigo: true,
      //     },
      //   },
      // },

      where: {
        nome: Like(`%${nome}%`),
      },

      relations: {
        curso: {
          nivel: true,
        },
      },
    });

    resposta.json(disciplina);
  },
  async create(requisicao: Request, resposta: Response) {
    console.log(requisicao.body);
    const { nome, curso } = requisicao.body;
    const disciplinaRepository = AppDataSource.getRepository(Disciplina);

    const disciplina = disciplinaRepository.create({
      nome,
      curso,
    });

    await disciplinaRepository.save(disciplina);
    return resposta.status(201).json(disciplina);
  },
};
