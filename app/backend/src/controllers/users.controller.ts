import { Request, Response } from 'express';
import Service from '../services/users.service';

export default class UsersController {
  private usersService: Service;

  constructor(usersService = new Service()) {
    this.usersService = usersService;
  }

  async login(req: Request, res: Response): Promise<void> {
    const { email, password } = req.body;

    const token = await this.usersService.login(email, password);

    res.status(200).json({ token });
  }

  async findRole(req: Request, res: Response): Promise<void> {
    const { email } = res.locals.user;

    const role = await this.usersService.findRole(email);

    res.status(200).json({ role });
  }
}
