export interface CreateUserSessionInput {
  userId: number;
  ip: string;
  userAgent: string;
}

export interface CreateUserInput {
  userName: string;
  email: string;
  password: string;
  homePage?: string;
  ip: string;
  userAgent: string;
}

export interface GetUserInput {
  email: string;
  password: string;
  ip: string;
  userAgent: string;
}
