import 'path';
import * as fs from 'fs/promises';
import * as path from 'path';

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
}

export default new FileService();
