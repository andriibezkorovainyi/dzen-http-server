import fileService from '../services/fileService';
import { Request, Response } from 'express';
import path from 'path';
import { GetObjectCommand, S3 } from '@aws-sdk/client-s3';

const s3Client = new S3({});

class FileController {
  async getFile(req: Request, res: Response) {
    console.log(req.params);

    try {
      const getObjectParams = {
        Bucket: 'dzen-bucket',
        Key: req.params.filename,
      };

      const response = await s3Client.send(new GetObjectCommand(getObjectParams));
      const responseString = await response.Body?.transformToString('base64');
      // ArrayBuffer
      // const blob = new Blob([arrayBuffer], {type: response.ContentType});


      const dataUrl = `data:${response.ContentType};base64,${responseString}`;
      res.status(200).json(dataUrl);
      console.log('Successfully generated dataUrl');
    } catch (e) {
      console.log(e);
      res.sendStatus(400);
    }

    // try {
    //   const dataUrl = await fileService.getFile(req.params.filename);
    //
    //   res.status(200).send(dataUrl);
    // } catch (err) {
    //   console.log(err);
    //   res.sendStatus(404);
    // }
  }

  async createFile(req: Request, res: Response) {
    const { filename } = req.params;
    const { dataUrl } = req.body;

    console.log(filename);

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
