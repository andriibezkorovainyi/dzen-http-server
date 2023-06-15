import 'path';
import * as fs from 'fs/promises';
import * as path from 'path';
import { PrismaClient } from '@prisma/client';
import { CreateFileClientPayload } from '../types/commentTypes';

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
      return `data:${mimeType};base64,${base64String}`;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  async createFile(filePath: string, binaryData: Buffer) {
    try {
      await fs.writeFile(filePath, binaryData);
    } catch (e) {
      console.log(e);
    }
  }
}

export default new FileService();
