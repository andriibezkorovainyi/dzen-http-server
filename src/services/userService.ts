import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';
import { CreateUserInput } from '../types/userTypes';

const prisma = new PrismaClient();

class UserService {
  async getUsers() {
    return prisma.user.findMany();
  }

  async getUserByEmail(email: string) {
    return prisma.user.findUnique({
      where: {
        email,
      },
    });
  }

  async getUserByUserName(userName: string) {
    return prisma.user.findUnique({
      where: {
        userName,
      },
    });
  }

  async createUser(data: CreateUserInput) {
    const { userName, email, password, homePage } = data;
    const safeDate = new Date().toISOString().replace(/:/g, '-') + '.svg';
    const avatarUrl = `https://api.multiavatar.com/${safeDate + userName}`;
    const hashedPassword = await bcrypt.hash(password, 10);

    return prisma.user.create({
      data: {
        userName,
        email,
        password: hashedPassword,
        homePage,
        avatarUrl,
      },
    });
  }
}

export default new UserService();
