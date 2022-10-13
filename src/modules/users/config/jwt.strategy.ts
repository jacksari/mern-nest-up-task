import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { jwtConstants } from './constants';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/entities/user.entity';
import { Repository } from 'typeorm';
import { statusUser } from '../../../entities/user.entity';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: jwtConstants.secret,
    });
  }

  async validate(payload: any) {
    const { uid } = payload;
    // console.log('payload', payload);
    const user = await this.usersRepository.findOneBy({ uid });

    if (!user) {
      throw new UnauthorizedException('Debe loguearse para tener acceso.');
    }

    if (user.status === statusUser.INACTIVO) {
      throw new UnauthorizedException({
        ok: false,
        message: 'El usuario está inactivo',
      });
    }
    return user;
  }
}
