import { Request, Response } from 'express';
import { Like } from 'typeorm';
import { AppDataSource } from '../data-source';
import Post from '../models/Post';
import postView from '../views/post-view';

export default {
  async index(requisicao: Request, resposta: Response) {
    const postRepository = AppDataSource.getRepository(Post);
    const posts = await postRepository.find({
      order: {
        message: 'ASC',
      },
      relations: ['images'],
    });

    resposta.json(postView.renderMany(posts));
  },

  async findByMessageParams(requisicao: Request, resposta: Response) {
    const { message } = requisicao.params;
    const postRepository = AppDataSource.getRepository(Post);

    const posts = await postRepository.find({
      where: {
        message: Like(`%${message}%`),
        //message: Like("%" + message + "%"),
      },
      relations: ['images'],
    });

    resposta.json(posts);
  },

  async findByMessageQuery(requisicao: Request, resposta: Response) {
    const { message } = requisicao.query;
    const postRepository = AppDataSource.getRepository(Post);

    const posts = await postRepository.find({
      where: {
        message: Like(`%${message}%`),
      },
      relations: ['images'],
    });

    resposta.json(posts);
  },

  async show(requisicao: Request, resposta: Response) {
    const { id } = requisicao.params;
    const postRepository = AppDataSource.getRepository(Post);
    const post = await postRepository.findOne({
      where: {
        id: +id,
      },
      relations: { images: true },
    });

    if (post) return resposta.json(postView.render(post));

    return resposta.status(404).json({
      message: 'Post not found.',
    });
  },

  async create(requisicao: Request, resposta: Response) {
    console.log(requisicao.body);
    console.log(requisicao.files);

    const { message } = requisicao.body;
    const postRepository = AppDataSource.getRepository(Post);

    const requestImagens = requisicao.files as Express.Multer.File[];
    const images = requestImagens.map((image) => {
      return { path: image.filename };
    });

    const post = postRepository.create({
      message,
      images,
    });

    await postRepository.save(post);
    return resposta.status(201).json(post);
  },
};
