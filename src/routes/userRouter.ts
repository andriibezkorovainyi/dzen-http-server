import { Router } from 'express';
import userController from '../controllers/userController';

export const userRouter = Router();

userRouter.post('/get', userController.getUser);

userRouter.post('/create', userController.createUser);
