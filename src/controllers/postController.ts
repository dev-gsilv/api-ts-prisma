import { Request, Response } from 'express';
import { prisma } from '../database';

export default {
  async createPost(request: Request, response: Response) {
    try {
      const { title, content, userId } = request.body;

      const post = await prisma.post.create({
        data: {
          title, content, userId
        }
      });

      return response.json({
        error: false,
        message: 'Sucesso: Post cadastrado com sucesso!',
        post
      });

    } catch (error) {
      return response.json({ message: error.message });
    }
  },

  async listPosts(request: Request, response: Response) {
    try {
      const posts = await prisma.post.findMany({

      });

      return response.json({
        posts
      });

    } catch (error) {
      return response.json({ message: error.message });
    }
  },

  async listPost(request: Request, response: Response) {
    const {id} = request.params;

    try {
      const post = await prisma.post.findUnique({ where: { id: Number(id) } });

      if (post) {
        return response.json({post});

      } else {
        return response.json({
          error: true,
          message: 'Erro: post não encontrado.'
        });

      }

    } catch (error) {
      return response.json({ message: error.message });
    }
  },

  async updatePost(request: Request, response: Response) {
    try {
      const { id, title, content } = request.body;

      const postExists = await prisma.post.findUnique({ where: { id: Number(id) } });

      if (!postExists) {
        return response.json({
          error: true,
          message: 'Erro: Post não encontrado.'
        });
      }

      const post = await prisma.post.update({
        where: {
          id: Number(request.body.id)},
        data: {
          title,
          content
        }
      });

      return response.json({
        message: 'Sucesso: Post atualizado.',
        post
      });

    } catch (error) {
      return response.json({ message: error.message });
    }
  },

  async deletePost(request: Request, response: Response) {
    try {
      const { id } = request.params;

      const postExists = await prisma.post.findUnique({ where: { id: Number(id) } });

      if (!postExists) {
        return response.json({
          error: true,
          message: 'Erro: Post não encontrado.'
        });
      }

      const post = await prisma.post.delete({where: {id: Number(id)}});

      return response.json({
        message: 'Sucesso: Post removido.',
        post
      });

    } catch (error) {
      return response.json({ message: error.message });
    }
  }
};
