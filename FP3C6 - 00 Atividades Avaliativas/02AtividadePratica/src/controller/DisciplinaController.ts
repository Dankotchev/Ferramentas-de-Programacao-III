import { Request, Response } from 'express';
import { Like } from 'typeorm';
import { AppDataSource } from '../data-source';
import Disciplina from '../models/Disciplina';
import Curso from '../models/Curso';

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
    const { nome, codigoCurso } = requisicao.body;

    const cursoRepository = AppDataSource.getRepository(Curso);
    const curso = await cursoRepository.findOne({
      where: {
        codigo: codigoCurso,
      },
    });

    if (curso) {
      const disciplinaRepository = AppDataSource.getRepository(Disciplina);
      const disciplina = disciplinaRepository.create({
        nome,
        curso,
      });

      await disciplinaRepository.save(disciplina);
      return resposta.status(201).json(disciplina);
    }

    return resposta.status(404).json({ erro: 'Curso não existe.' });
  },
};
