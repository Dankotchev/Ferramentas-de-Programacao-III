import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import User from '../models/Product';
import Product from '../models/Product';

export default {
  async create(requisicao: Request, resposta: Response) {
    console.log(requisicao.body);
    const { nome, estoque, preco } = requisicao.body;

    // getRepository vem do typerform, e passa a entidade (User)
    const productRepository = getRepository(Product);

    // criar um objeto
    const user = productRepository.create({
      nome,
      estoque,
      preco,
    });

    await productRepository.save(user);

    return resposta.status(201).json(user);
  },

  async index(requisicao: Request, resposta: Response) {
    const productRepository = getRepository(Product);
    const product = await productRepository.find();
    resposta.json(product);
  },

  async show(requisicao: Request, resposta: Response) {
    const { id } = requisicao.params;
    const productRepository = getRepository(Product);
    const product = await productRepository.findOneOrFail(id);
    resposta.json(product);
  },
};
