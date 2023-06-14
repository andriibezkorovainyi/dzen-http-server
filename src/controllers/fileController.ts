import fileService from '../services/fileService';
import { Request, Response } from 'express';

class FileController {
  async getFile(req: Request, res: Response) {
    console.log('GetStaticFile');

    try {
      const dataUrl = await fileService.getFile(req.params.fileName);

      console.log(dataUrl);

      res.status(200).send(dataUrl);
    } catch (err) {
      console.log(err);
      res.sendStatus(404);
    }
  }
}

export default new FileController();
