import { type Request, type Response, type NextFunction } from 'express';
import { Auth } from '../models/Auth';

export async function checkIfHasToken (req: Request, res: Response, next: NextFunction) {
  const decodedToken = req.headers.authorization
    ? await new Auth().validateToken(req.headers.authorization.replace('Bearer ', ''))
    : '';

  if (!decodedToken) {
    return res.status(401).json({ message: 'Authorization failed' });
  }

  res.locals.decodedToken = decodedToken;
  next();
}

export function checkRequiredId (req: Request, res: Response, next: NextFunction) {
  const { id } = req.params;

  if (!id) {
    return res.status(400).json({ message: 'Missing parameters' });
  }

  next();
}

export function checkRequiredParams (req: Request, res: Response, next: NextFunction) {
  const { name, lastname, email, password, role } = req.body;

  if (!(name && lastname && email && password && role)) {
    return res.status(400).json({ message: 'Missing parameters' });
  }

  next();
}
