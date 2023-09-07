import * as jwt from 'jsonwebtoken';
import { Injectable } from '@nestjs/common';

@Injectable()
export class JWTService {
  private readonly secretKey: string = process.env.JWT_ACCESS_PRIVATE_KEY;
  private readonly refreshTokenSecretKey: string = process.env.JWT_REFRESH_PRIVATE_KEY;

  async signAccessToken(payload: Record<string, any>, expiresIn: string = '2d'): Promise<string> {
    return jwt.sign(payload, this.secretKey, { expiresIn });
  }

  async signRefreshToken(payload: Record<string, any>, expiresIn: string = '7d'): Promise<string> {
    return jwt.sign(payload, this.refreshTokenSecretKey, { expiresIn });
  }

  async verifyAccessToken(token: string): Promise<Record<string, any> | null> {
    try {
      return jwt.verify(token, this.secretKey);
    } catch (error) {
      return null;
    }
  }

  async verifyRefreshToken(token: string): Promise<Record<string, any> | null> {
    try {
      return jwt.verify(token, this.refreshTokenSecretKey);
    } catch (error) {
      return null;
    }
  }
}
