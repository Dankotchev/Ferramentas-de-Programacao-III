import { Request, Response } from 'express';
import { AppDataSource } from '../data-source';
import Product from '../models/Product';
import { LessThan, Like } from 'typeorm';

export default {
  async create(requisicao: Request, resposta: Response) {
    console.log(requisicao.body);
    const { nome, preco, estoque } = requisicao.body;
    const productRepository = AppDataSource.getRepository(Product);

    const product = productRepository.create({
      nome,
      preco,
      estoque,
    });

    await productRepository.save(product);
    return resposta.status(201).json(product);
  },

  async index(requisicao: Request, resposta: Response) {
    const productRepository = AppDataSource.getRepository(Product);
    const product = await productRepository.find();
    resposta.json(product);
  },

  async show(requisicao: Request, resposta: Response) {
    const { codigo } = requisicao.params;
    const productRepository = AppDataSource.getRepository(Product);
    const product = await productRepository.findOneByOrFail({
      codigo: +codigo,
    });
    resposta.json(product);
  },

  async findByName(requisicao: Request, resposta: Response) {
    const { name } = requisicao.params;
    const postRepository = AppDataSource.getRepository(Product);

    const posts = await postRepository.findBy({
      nome: Like(`%${name}%`),
    });

    resposta.json(posts);
  },

  async findByPrice(requisicao: Request, resposta: Response) {
    const { price } = requisicao.params;
    const postRepository = AppDataSource.getRepository(Product);

    const product = await postRepository.findBy({
      preco: LessThan(price),
    });

    resposta.json(product);
  },

  async delete(requisicao: Request, resposta: Response) {
    const { codigo } = requisicao.params;

    if (codigo == null)
      return resposta
        .status(406)
        .json({ erro: 'Código de produto não informado.' });

    const productRepository = AppDataSource.getRepository(Product);
    const product = await productRepository.findOneByOrFail({
      codigo: +codigo,
    });

    if (product) {
      await productRepository.remove(product);
      return resposta.status(204).json(product);
    }
    resposta.status(404).json({ erro: 'Produto não existe.' });
  },

  async update(requisicao: Request, resposta: Response) {
    const { codigo } = requisicao.params;

    if (codigo == null)
      return resposta
        .status(406)
        .json({ erro: 'Código de produto não informado.' });

    const productRepository = AppDataSource.getRepository(Product);
    const product = await productRepository.findOneByOrFail({
      codigo: +codigo,
    });

    if (product) {
      productRepository.merge(product, requisicao.body);
      await productRepository.save(product);
      return resposta.status(204).json(product);
    }
    resposta.status(404).json({ erro: 'Produto não existe.' });
  },
};
