import { type Request, type Response } from 'express';
import { User } from '../models/User';

export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  if (!(email && password)) {
    return res.status(400).json({ message: 'Missing parameters' });
  }

  try {
    const { user, token } = await new User().login(email, password);
    res.status(200).json({ user, token });
  } catch (error) {
    res.status(400).json({ message: error });
  }
};
