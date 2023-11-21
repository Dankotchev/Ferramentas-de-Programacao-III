import { NextFunction, Request, Response } from 'express';
import { TokenExpiredError } from 'jsonwebtoken';
import * as jwt from 'jsonwebtoken';

const extractToken = (req: Request) => {
  const authorization = req.headers.authorization || '';
  return authorization.replace('Bearer ', '');
};

export default {
  validate(requisicao: Request, resposta: Response, proximaFuncao: NextFunction) {
    const token = extractToken(requisicao);

    if (!token)
      return resposta.status(401).json({ auth: false, message: 'Token não foi provido.' });

    try {
      // Verifica se assinatura está válida
      jwt.verify(token, process.env.ACCESS_TOKEN_SECRET as string);
      proximaFuncao();
    } catch (err) {
      // Caso seja inválido
      if (err instanceof TokenExpiredError) {
        // Token expirado
        return resposta.status(401).json({ auth: false, message: 'Sessão encerrada.' });
      }
      // Outro erro de autenticação
      return resposta.status(500).json({ auth: false, message: 'Falha na autenticação do Token.' });
    }
  },
};
