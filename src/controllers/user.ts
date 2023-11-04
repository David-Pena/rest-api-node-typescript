import { type Request, type Response } from 'express';
import { User } from '../models/User';

export const fetch = async (req: Request, res: Response) => {
  try {
    const users = await new User().find();
    res.status(200).json(users);
  } catch (error) {
    res.status(400).json({ message: error });
  }
};

export const getById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const user = await new User().findOne(id);
    res.status(200).json(user);
  } catch (error) {
    res.status(400).json({ message: error });
  }
};

export const create = async (req: Request, res: Response) => {
  try {
    const data = req.body;
    await new User().create(data);
    res.status(200).json({ message: 'User created successfully!' });
  } catch (error) {
    res.status(400).json({ message: error });
  }
};

export const edit = async (req: Request, res: Response) => {
  try {
    const data = req.body;
    const userId = data.id;
    delete data.id;

    await new User().update(userId, { ...data });
    res.status(200).json({ message: 'User updated successfully' });
  } catch (error) {
    res.status(400).json({ message: error });
  }
};

export const remove = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    await new User().remove(id);
    res.status(200).json({ message: 'User deleted successfully' });
  } catch (error) {
    res.status(400).json({ message: error });
  }
};
