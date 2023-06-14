import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

class UserSessionService {
  async createUserSession(id: number, ip: string, userAgent: string) {
    return prisma.userSession.create({
      data: {
        userId: id,
        ip,
        userAgent,
      },
    });
  }
}

export default new UserSessionService();
