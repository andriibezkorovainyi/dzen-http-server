import axios from 'axios';
import { Request, Response } from 'express';

class CaptchaController {
  async verifyToken(req: Request, res: Response) {
    try {
      const { token, secret } = req.body;

      const response = await axios.post(
        `https://www.google.com/recaptcha/api/siteverify?secret=${secret}&response=${token}`
      );
      return res.status(200).json({
        success: true,
        message: 'Token successfully verified',
        data: response.data,
      });
    } catch (error) {
      console.log(error);
      return res.status(500).json({
        success: false,
        message: 'Error verifying token',
      });
    }
  }
}

export default new CaptchaController();
