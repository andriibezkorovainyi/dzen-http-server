import express from 'express';
import cors from 'cors';
import { userRouter } from './routes/userRouter';
import { fileRouter } from './routes/fileRouter';
import captchaController from './controllers/captchaController';
import path from 'path';

function main() {
  const app = express();
  const publicPath = path.join(__dirname, '..', 'public');

  app.use(cors());
  app.use(express.json());
  app.use(express.static(publicPath));


  app.use('/user', userRouter);
  app.use('/file', fileRouter);

  app.post('/verify-token', captchaController.verifyToken);

  app.listen(process.env.PORT, () => {
    global.console.log(`Server listening on port ${process.env.PORT}`);
  });
}

main();
