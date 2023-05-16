import { compare } from 'bcryptjs';
import Model from '../database/models/User.model';
import { generateToken } from '../utils/jwt';

export default class UsersService {
  login = async (email: string, password: string): Promise<string | null> => {
    const user = await Model.findOne({ where: { email } });

    if (!user) {
      const error: Error & { status?: number } = new Error('Invalid email or password');
      error.status = 401;
      throw error;
    }

    const passwordMatch = await compare(password, user.password);

    if (!passwordMatch) {
      const error: Error & { status?: number } = new Error('Invalid email or password');
      error.status = 401;
      throw error;
    }

    const token = generateToken(email);
    return token;
  };

  findRole = async (email: string): Promise<string | null> => {
    const user = await Model.findOne({ where: { email } });

    if (!user) {
      const error: Error & { status?: number } = new Error('User not found');
      error.status = 404;
      throw error;
    }

    return user.dataValues.role || null;
  };
}
