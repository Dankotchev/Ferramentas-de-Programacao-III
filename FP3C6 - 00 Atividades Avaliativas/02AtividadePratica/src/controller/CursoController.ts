import { Request, Response } from 'express';
import { Like } from 'typeorm';
import * as Yup from 'yup';

import { AppDataSource } from '../data-source';
import Curso from '../models/Curso';
import Nivel from '../models/Nivel';

// Regras de validação
const regras = Yup.object().shape({
  nome: Yup.string().required('Informe um nome de curso.'),
  periodo: Yup.string().required('Informe um período.'),
  nivel: Yup.number().positive().integer().required('Informe um nível.'),
});

export default {
  async create(requisicao: Request, resposta: Response) {
    // Validação
    try {
      const curso = await regras.validate(requisicao.body, {
        abortEarly: false,
      });
      // Após validação, retorna o objeto, podendo ser utilizado para salvar no banco de dados
      // Salvar em banco

      // Buscar o nível para o curso
      const nivelRepository = AppDataSource.getRepository(Nivel);
      const nivel = await nivelRepository.findOne({
        where: {
          codigo: curso.nivel,
        },
      });

      // Se existir o nível, salva o novo curso
      if (nivel) {
        const cursoRepository = AppDataSource.getRepository(Curso);
        const cursoInserir = cursoRepository.create({
          nome: curso.nome,
          periodo: curso.periodo,
          nivel,
        });

        await cursoRepository.save(cursoInserir);
        return resposta.status(201).json(cursoInserir);
      }
      // Não existe o nível
      return resposta.status(404).json({ erro: 'Nível não existente.' });
    } catch (error: any) {
      // Apresenta os erros que surgem da validação
      console.log(error);
      resposta.status(400).json({ Erro: error.errors });
    }
  },

  async index(requisicao: Request, resposta: Response) {
    const cursoRepository = AppDataSource.getRepository(Curso);
    const cursos = cursoRepository.find();
    console.log(cursos);

    return resposta.status(201).json(cursos);
  },

  async update(requisicao: Request, resposta: Response) {
    // Código do curso a ser atualizado
    const { codigo } = requisicao.params;
    try {
      const curso = await regras.validate(requisicao.body, {
        abortEarly: false,
      });

      // buscar o curso
      const cursoRepository = AppDataSource.getRepository(Curso);
      const cursoBuscar = await cursoRepository.findOne({
        where: {
          codigo: +codigo,
        },
      });

      if (cursoBuscar) {
        const nivelRepository = AppDataSource.getRepository(Nivel);
        const nivel = await nivelRepository.findOne({
          where: {
            codigo: curso.nivel,
          },
        });

        if (nivel) {
          const cursoAtualizar = cursoRepository.update(
            {
              codigo: +codigo,
            },
            { nome: curso.nome, periodo: curso.periodo, nivel }
          );
          return resposta.status(201).json(cursoAtualizar);
        }
        return resposta.status(404).json({ erro: 'Nível não existente.' });
      }
      return resposta.status(404).json({ erro: 'Curso não existente.' });
    } catch (error: any) {
      // Apresenta os erros que surgem da validação
      console.log(error);
      resposta.status(400).json({ Erro: error.errors });
    }
  },

  async delete(requisicao: Request, resposta: Response) {
    const regrasDeletar = Yup.object().shape({
      codigo: Yup.number().positive().integer().required('Informe uma curso.'),
    });

    try {
      const cursoExcluir = await regrasDeletar.validate(requisicao.body, {
        abortEarly: false,
      });

      const cursoRepository = AppDataSource.getRepository(Curso);
      const curso = await cursoRepository.findOne({
        where: {
          codigo: +cursoExcluir.codigo,
        },
        relations: {
          disciplinas: true,
        },
      });

      if (curso) {
        if (curso.disciplinas.length == 0) {
          await cursoRepository.remove(curso);
          return resposta.status(201).json(Curso);
        }
        return resposta.status(406).json({
          erro: 'Curso não pode ser excluido. Possui disciplinas vinculadas',
        });
      }
      return resposta.status(404).json({ erro: 'Curso não existe.' });
    } catch (error: any) {
      console.log(error);
      resposta.status(400).json({ Erro: error.errors });
    }
  },

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
};
