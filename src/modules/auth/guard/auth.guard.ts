import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';
import { JWTService } from '../jwt.service';

@Injectable()
export class AuthGuard implements CanActivate {
  jwtService: JWTService;

  canActivate( context: ExecutionContext ): boolean | Promise<boolean> | Observable<boolean> {


    this.jwtService = new JWTService();
    const request = context.switchToHttp().getRequest();
    const token = request.headers.authorization;

    if (!token) {
      return false; // Token is missing
    }

    return this.jwtService
      .verifyAccessToken(token)
      .then((decodedToken) => {
        if (!decodedToken) {
          return false; // Token is invalid
        }

        request.user = decodedToken;

        return true; // Token is valid
      })
      .catch((error) => {
        return false; // Token validation failed
      });
  }
}
