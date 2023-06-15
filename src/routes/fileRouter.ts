import { Router } from 'express';
import fileController from '../controllers/fileController';

export const fileRouter = Router();

fileRouter.get('/:filename', fileController.getFile);
fileRouter.post('/:filename', fileController.createFile);
