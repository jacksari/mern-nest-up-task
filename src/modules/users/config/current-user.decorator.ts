import {
  createParamDecorator,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';
import { User } from 'src/entities/user.entity';

export const CurrentUser = createParamDecorator(
  (data: unknown, ctx: ExecutionContext): User => {
    const request = ctx.switchToHttp().getRequest();

    if (!request.user) {
      throw new UnauthorizedException({
        ok: false,
        message: 'No hay usuario logueado.',
      });
    }
    if (data) {
      return request.user[data as string];
    }
    return request.user;
  },
);
