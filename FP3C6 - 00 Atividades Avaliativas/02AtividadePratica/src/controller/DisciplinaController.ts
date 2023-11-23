import { Request, Response } from 'express';
import { Like } from 'typeorm';
import * as Yup from 'yup';

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
    const regras = Yup.object().shape({
      nome: Yup.string().required('Informe um nome para a disciplina'),
      curso: Yup.number().positive().integer().required('Informe um curso.'),
    });

    try {
      const disciplina = await regras.validate(requisicao.body, {
        abortEarly: false,
      });

      const cursoRepository = AppDataSource.getRepository(Curso);
      const cursoDisciplina = await cursoRepository.findOne({
        where: {
          codigo: disciplina.curso,
        },
      });

      if (cursoDisciplina) {
        const disciplinaRepository = AppDataSource.getRepository(Disciplina);
        const disciplinaSalvar = disciplinaRepository.create({
          nome: disciplina.nome,
          curso: cursoDisciplina,
        });

        await disciplinaRepository.save(disciplinaSalvar);
        return resposta.status(201).json(disciplinaSalvar);
      }

      return resposta.status(404).json({ erro: 'Curso não existe.' });
    } catch (error: any) {
      // Apresenta os erros que surgem da validação
      console.log(error);
      resposta.status(400).json({ Erro: error.errors });
    }
  },
};
