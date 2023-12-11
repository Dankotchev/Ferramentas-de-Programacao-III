import { NextFunction, Request, Response } from 'express';

export default {
  validate(
    requisicao: Request,
    resposta: Response,
    proximaFuncao: NextFunction
  ) {
    const { token } = requisicao.params;
    if (!token)
      return resposta
        .status(401)
        .json({ auth: false, message: 'Token não foi provido.' });

    if (token == process.env.ACCESS_TOKEN_SECRET) {
      proximaFuncao();
    }
    else
    return resposta
        .status(401)
        .json({ auth: false, message: 'Token inválido ou não enviado.' });
  },
};
