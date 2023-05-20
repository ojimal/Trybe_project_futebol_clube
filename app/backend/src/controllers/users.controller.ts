import { Request, Response } from 'express';
import Service from '../services/users.service';

export default class UsersController {
  static async login(req: Request, res: Response): Promise<void> {
    const { email, password } = req.body;

    const token = await Service.login(email, password);

    res.status(200).json({ token });
  }

  static async findRole(req: Request, res: Response): Promise<void> {
    const { email } = res.locals.user;

    const role = await Service.findRole(email);

    res.status(200).json({ role });
  }
}
