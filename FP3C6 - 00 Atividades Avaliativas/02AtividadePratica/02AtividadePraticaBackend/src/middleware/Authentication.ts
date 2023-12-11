import { NextFunction, Request, Response } from 'express';
import { TokenExpiredError } from 'jsonwebtoken';
import * as jwt from 'jsonwebtoken';

const extrairToken = (requisicao: Request) => {
  const authorization = requisicao.headers.authorization || '';
  return authorization.replace('Bearer ', '');
};

export default {
  validate(
    requisicao: Request,
    resposta: Response,
    proximaFuncao: NextFunction
  ) {
    const token = extrairToken(requisicao);

    if (!token)
      return resposta
        .status(401)
        .json({ auth: false, message: 'Token não foi provido.' });

    try {
      // Verifica se assinatura está válida
      jwt.verify(token, process.env.ACCESS_TOKEN_SECRET as string);
      proximaFuncao();
    } catch (error: any) {
      if (error instanceof TokenExpiredError) {
        // Token expirado
        return resposta
          .status(401)
          .json({ auth: false, message: 'Sessão encerrada.' });
      }
      return resposta
        .status(500)
        .json({ auth: false, message: 'Falha na autenticação do Token.' });
    }
  },
};
