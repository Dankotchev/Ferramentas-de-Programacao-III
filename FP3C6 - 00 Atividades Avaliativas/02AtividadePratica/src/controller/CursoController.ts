import { Request, Response } from 'express';
import { Like } from 'typeorm';
import { AppDataSource } from '../data-source';
import Curso from '../models/Curso';
import Disciplina from '../models/Disciplina';

export default {
  async findByNivel(requisicao: Request, resposta: Response) {
    const { nivel } = requisicao.params;
    const cursoRepository = AppDataSource.getRepository(Curso);

    const curso = await cursoRepository.find({
      where: {

        nivel: {
          codigo: Like(`%${nivel}%`)
        },
      },
    });

    resposta.json(curso);
  },

  async findByNome(requisicao: Request, resposta: Response) {
    const { nome } = requisicao.params;
    const cursoRepository = AppDataSource.getRepository(Curso);

    const curso = await cursoRepository.find({
      where: {
        nome: Like(`%${nome}%`),
      },

      relations: {
        disciplina: {
          nome: true,
        },
      },

    });

    resposta.json(curso);
  },

  async delete(requisicao: Request, resposta: Response) {
    const { codigo } = requisicao.params;

    if (codigo == null)
      return resposta
        .status(406)
        .json({ erro: 'Código de curso não informado.' });

    const cursoRepository = AppDataSource.getRepository(Curso);
    const DisciplinaRepository = AppDataSource.getRepository(Disciplina);

    const curso = await cursoRepository.findOneByOrFail({
      codigo: +codigo,
    });

    const disciplinas = await DisciplinaRepository.findBy({
      curso: curso,
    });

    if (disciplinas.length != 0) {
      return resposta
        .status(400)
        .json({ erro: 'Curso possui disciplinas cadastradas' });
    }

    if (curso) {
      await cursoRepository.remove(curso);
      return resposta.status(204).json(curso);
    }
    resposta.status(404).json({ erro: 'Curso não existe.' });
  },
};
