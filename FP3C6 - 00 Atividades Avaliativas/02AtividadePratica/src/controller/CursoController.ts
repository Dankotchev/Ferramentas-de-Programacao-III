import { Request, Response } from 'express';
import { Like } from 'typeorm';
import * as Yup from "yup";

import { AppDataSource } from '../data-source';
import Curso from '../models/Curso';
import Nivel from '../models/Nivel';

export default {
  async create (requisicao: Request, resposta: Response){


    // Regras de validação
    const regras = Yup.object().shape({
      nome: Yup.string().required("Informe um nome de curso."),
      periodo: Yup.string().required("Informe um período."),
      nivel: Yup.number().positive().integer().required("Informe um nível.")
    });

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
      })

      // Se existir o nível, salva o novo curso
      if (nivel) {
        const cursoRepository = AppDataSource.getRepository(Curso);
        const cursoInserir = cursoRepository.create({
          nome: curso.nome,
          periodo: curso.periodo,
          nivel
        })

        await cursoRepository.save(cursoInserir);
        resposta.status(201).json(cursoInserir);
      }
      // Não existe o nível
      return resposta.status(404).json({ erro: 'Nível não existente.' });


    } catch (error: any) {
      // Apresenta os erros que surgem da validação
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
