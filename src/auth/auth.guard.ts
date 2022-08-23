import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Observable } from 'rxjs';
import { Socket } from 'socket.io';
import { Constants } from '../constants';

@Injectable()
export class AuthGuard implements CanActivate {

  constructor(
    private readonly config: ConfigService
  ) {}

  canActivate(
    context: ExecutionContext
  ): boolean | Promise<boolean> | Observable<boolean> {
    const client = context.switchToWs().getClient<Socket>();
    const value = this.validateRequest(client.handshake.headers.authorization);
    if(!value)
      throw new Error("Unauthorizaed");
    return true;
  }

  private validateRequest(authHeader: string): boolean | Promise<boolean> | Observable<boolean> {
    return this.config.get(Constants.AuthToken) === authHeader;
  }

}
