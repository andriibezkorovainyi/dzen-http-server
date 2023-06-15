import express from 'express';
import cors from 'cors';
import { userRouter } from './routes/userRouter';
import { fileRouter } from './routes/fileRouter';
import captchaController from './controllers/captchaController';
import path from 'path';
import { configDotenv } from 'dotenv';
import bodyParser from 'body-parser';

configDotenv();

function main() {
  const app = express();
  const publicPath = path.join(__dirname, '..', 'public');
  const PORT = process.env.PORT;

  app.use(cors());
  app.use(express.static(publicPath));

  app.use(bodyParser.json({ limit: '10mb' }));
  app.use(bodyParser.urlencoded({ limit: '10mb', extended: true }));

  app.use('/user', userRouter);
  app.use('/file', fileRouter);

  app.post('/verify-token', captchaController.verifyToken);

  app.listen(PORT, () => {
    global.console.log(`Server listening on port ${PORT}`);
  });
}

main();
