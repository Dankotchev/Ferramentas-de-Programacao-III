import { Request, Response } from 'express';
import { AppDataSource } from '../data-source';
import Post from '../models/Post';

export default {
  async index(requisicao: Request, resposta: Response) {

    const postRepository = AppDataSource.getRepository(Post);
    const posts = await postRepository.find({
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

    console.log(post);
    resposta.json(post);
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
