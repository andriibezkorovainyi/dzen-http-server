import 'path';
import * as fs from 'fs/promises';
import * as path from 'path';
import { CreateFileClientPayload } from '../types/commentTypes';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

class FileService {
  async getFile(fileName: string) {
    const filePath = path.resolve(__dirname, '..', '..', 'public', fileName);
    let mimeType;

    switch (path.extname(fileName).toLowerCase()) {
    case '.txt':
      mimeType = 'text/plain';
      break;

    case '.png':
      mimeType = 'image/png';
      break;

    case '.jpg':
    case '.jpeg':
      mimeType = 'image/jpeg';
      break;

    case '.gif':
      mimeType = 'image/gif';
      break;

    default:
      mimeType = 'application/octet-stream';
    }

    try {
      const storedFile = await fs.readFile(filePath);
      const base64String = storedFile.toString('base64');
      const dataURL = `data:${mimeType};base64,${base64String}`;

      console.log(dataURL);

      return dataURL;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  async createFile(file: CreateFileClientPayload, commentId: number) {
    const { fileName, dataUrl } = file;

    const uniqueFileName = `${Date.now()}-${fileName}`;
    const safeFileName = uniqueFileName
      .replace(/[^a-z0-9.]/gi, '_')
      .toLowerCase();
    const filePath = path.resolve(
      __dirname,
      '..',
      '..',
      'public',
      safeFileName
    );
    const mimeType = dataUrl.split(';')[0].split(':')[1];
    const base64String = dataUrl.split(',')[1];
    const binaryData = Buffer.from(base64String, 'base64');

    try {
      const fileData = await Promise.all([
        await prisma.file.create({
          data: {
            name: safeFileName,
            commentId,
            size: binaryData.length,
            type: mimeType,
            url: `/${safeFileName}`,
          },
        }),
        await fs.writeFile(filePath, binaryData),
      ]);

      console.log('create File', fileData[0]);

      return fileData[0];
    } catch (error) {
      console.log(error);
    }
  }
}

export default new FileService();
