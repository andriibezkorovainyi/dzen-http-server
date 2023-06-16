import { validateUserData } from '../validators/validateUserData';
import userService from '../services/userService';
import userSessionService from '../services/userSessionService';
import { CreateUserInput } from '../types/userTypes';
import { Request, Response } from 'express';
import bcrypt from 'bcrypt';

class UserController {
  async getUser(req: Request, res: Response) {
    const { email, password } = req.body;

    const user = await userService.getUserByEmail(email);

    if (!user) {
      res.json({
        errors: ['User with such email is not found, please, sign up'],
      });
      return;
    }

    const isPasswordCorrect = await bcrypt.compare(password, user.password);

    if (!isPasswordCorrect) {
      res.json({
        errors: ['Password is incorrect'],
      });
      return;
    }

    const { id } = user;
    const ip = req.ip;
    const userAgent = req.get('User-Agent') || 'no user agent';

    console.log(ip);

    await userSessionService.createUserSession(id, ip, userAgent);

    res.json({
      user,
    });
  }

  async createUser(req: Request, res: Response) {
    const userData: CreateUserInput = req.body;

    const isUserExist = await Promise.all([
      await userService.getUserByEmail(userData.email),
      await userService.getUserByUserName(userData.userName),
    ]);

    if (isUserExist[0] || isUserExist[1]) {
      res.json({
        errors: ['Such user exists, please, log in'],
      });
      return;
    }

    const errors = validateUserData(userData);

    if (errors) {
      res.json({
        errors,
      });
      return;
    }

    try {
      const user = await userService.createUser(userData);
      const { id } = user;
      const ip = req.ip;
      const userAgent = req.get('User-Agent') || 'no user agent';

      res.json({ user });

      await userSessionService.createUserSession(id, ip, userAgent);
    } catch (err) {
      console.log(err);
    }
  }
}

export default new UserController();
