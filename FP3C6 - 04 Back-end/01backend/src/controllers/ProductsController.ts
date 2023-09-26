import { Request, Response } from 'express';
import { AppDataSource } from '../data-source';
import Product from '../models/Product';

export default {
  async create(requisicao: Request, resposta: Response) {
    console.log(requisicao.body);
    const { nome, estoque, preco } = requisicao.body;

    // getRepository vem do typerform, e passa a entidade (User)
    const productRepository = AppDataSource.getRepository(Product);

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
    const productRepository = AppDataSource.getRepository(Product);
    const product = await productRepository.find();
    resposta.json(product);
  },

  async show(requisicao: Request, resposta: Response) {
    const { id } = requisicao.params;
    const productRepository = AppDataSource.getRepository(Product);
    const product = await productRepository.findOneByOrFail({ id: +id });
    resposta.json(product);
  },

  async delete(requisicao: Request, resposta: Response) {
    const { id } = requisicao.params;
    const productRepository = AppDataSource.getRepository(Product);
    const product = await productRepository.findOneByOrFail({ id: +id });

    if (product) {
      await productRepository.remove(product);
      return resposta.status(204).json(product);
    }
    resposta.status(404).json();
  },
};
