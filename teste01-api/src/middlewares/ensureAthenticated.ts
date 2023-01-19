import { type Request, type Response, type NextFunction } from 'express';
import { verify } from 'jsonwebtoken';
import { prisma } from '../database/prismaClient';

type IPayload = {
  sub: string;
};

export async function ensureAuthenticated(req: Request, res: Response, next: NextFunction) {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({
      message: 'Token is missing',
    });
  }

  const [, token] = authHeader.split(' ');

  try {
    const { sub: user_id } = verify(token, `${process.env.JWT_TOKEN}`) as IPayload;

    const user = await prisma.user.findFirst({
      where: {
        id: user_id,
      },
    });

    if (!user) {
      return res.status(401).json({
        message: 'user does not exists',
      });
    }

    req.user = {
      id: user_id,
    };

    next();
  } catch {
    return res.status(401).json({
      message: 'Invalid token',
    });
  }
}
