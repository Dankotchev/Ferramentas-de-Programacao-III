import { Request, Response } from 'express';
import { Like } from 'typeorm';
import { AppDataSource } from '../data-source';
import Curso from '../models/Curso';

export default {
  async findByNivel(requisicao: Request, resposta: Response) {
    const { nivel } = requisicao.params;
    const cursoRepository = AppDataSource.getRepository(Curso);

    const curso = await cursoRepository.find({
      where: {
        nivel: {
          codigo: +nivel,
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
        nivel: true,
        disciplinas: true,
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

    const curso = await cursoRepository.findOne({
      where: {
        codigo: +codigo,
      },
      relations: {
        disciplinas: true,
      },
    });

    if (curso) {
      if (curso.disciplinas.length == 0)
        // Não tem disciplinas, pode remover
        await cursoRepository.remove(curso);
      else
        return resposta.status(406).json({erro: 'Curso não pode ser excluido. Possui disciplinas vinculadas'});
      // Tem disciplinas, não pode remover
    } else
      resposta.status(404).json({ erro: 'Curso não existe.' });

    return resposta.status(204).json(curso);
  },
};
