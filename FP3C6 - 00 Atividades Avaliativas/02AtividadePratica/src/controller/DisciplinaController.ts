import { Request, Response } from 'express';
import { Like } from 'typeorm';
import { AppDataSource } from '../data-source';
import Disciplina from '../models/Disciplina';

export default {
  async findByNome(requisicao: Request, resposta: Response) {
    const { nome } = requisicao.params;
    const disciplinaRepository = AppDataSource.getRepository(Disciplina);

    const disciplina = await disciplinaRepository.find({
      where: {
        nome: Like(`%${nome}%`),
      },

      relations: {
        curso: {
          nivel: true,
        },
      },
    });

    const resultado = disciplina.map((disciplina) => {
      return {
        codigoDisciplina: disciplina.codigo,
        nomeDisciplina: disciplina.nome,
        nomeCurso: disciplina.curso.nome,
        nivelCurso: disciplina.curso.nivel.nome,
      };
    });

    resposta.json(resultado);
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
