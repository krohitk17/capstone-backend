import {
  Injectable,
  CanActivate,
  ExecutionContext,
  Logger,
} from '@nestjs/common';

import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private jwtService: JwtService) {}
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    try {
      const token = request.headers['authorization'].split(' ')[1];
      const payload = await this.jwtService.verifyAsync(token);
      request.username = payload.username;
      return true;
    } catch (error) {
      Logger.error(error);
      return false;
    }
  }
}
