import fileService from '../services/fileService';
import { Request, Response } from 'express';
import path from 'path';
import { GetObjectCommand, S3 } from '@aws-sdk/client-s3';

const s3Client = new S3({});

class FileController {
  async getFile(req: Request, res: Response) {
    try {
      const getObjectParams = {
        Bucket: 'dzen-bucket',
        Key: req.params.filename,
      };

      const response = await s3Client.send(new GetObjectCommand(getObjectParams));
      const responseString = await response.Body?.transformToString('base64');


      const dataUrl = `data:${response.ContentType};base64,${responseString}`;
      res.status(200).json(dataUrl);
      console.log('Successfully generated dataUrl');
    } catch (e) {
      console.log(e);
      res.sendStatus(400);
    }
  }

  async createFile(req: Request, res: Response) {
    const { filename } = req.params;
    const { dataUrl } = req.body;

    const filePath = path.resolve(
      __dirname,
      '..',
      '..',
      'public',
      filename
    );
    const base64String = dataUrl.split(',')[1];
    const binaryData = Buffer.from(base64String, 'base64');

    try {
      await fileService.createFile(filePath, binaryData);
      res.sendStatus(200);
    } catch (e) {
      console.log(e);
      res.sendStatus(422);
    }
  }
}

export default new FileController();
