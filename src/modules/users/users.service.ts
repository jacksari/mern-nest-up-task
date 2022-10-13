import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/entities/user.entity';
import { Repository } from 'typeorm';
import { hashPassword } from './helpers.auth';
import { CreateUserDto } from './dto/create-user.dto';
import { LoginDto } from './dto/login.dto';
import { compare, compareSync } from 'bcrypt';
import assignJwtToken from './config/jwt';
import { JwtService } from '@nestjs/jwt';
import { uid } from 'uid';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    private jwtService: JwtService,
  ) {}

  findAll(): Promise<User[]> {
    return this.usersRepository.find({
      select: [
        'id',
        'email',
        'firstName',
        'lastName',
        'created_at',
        'updated_at',
      ],
    });
  }

  findOne(id: number): Promise<User> {
    return this.usersRepository.findOne({
      where: { id },
      select: [
        'id',
        'uid',
        'email',
        'firstName',
        'lastName',
        'created_at',
        'updated_at',
      ],
    });
  }

  async remove(id: string): Promise<void> {
    await this.usersRepository.delete(id);
  }

  async create(createUserDto: CreateUserDto) {
    const userExist = await this.usersRepository.findOne({
      where: { email: createUserDto.email.toLowerCase().trim() },
    });
    if (userExist) {
      return new NotFoundException({
        ok: false,
        message: 'El usuario con ese email ya existe',
      });
    }
    return this.usersRepository.save({
      ...createUserDto,
      email: createUserDto.email.toLowerCase().trim(),
      uid: uid(32),
      password: await hashPassword(createUserDto.password),
    });
  }
  async login(loginDto: LoginDto) {
    const { email, password } = loginDto;
    try {
      const user = await this.usersRepository.findOne({
        where: { email },
        select: ['id', 'email', 'password'],
      });
      if (!user) {
        return new UnauthorizedException({
          ok: false,
          message: 'El usuario no existe en la base de datos',
        });
      }
      const isPasswordMatched = compareSync(password, user.password);
      if (!isPasswordMatched) {
        return new UnauthorizedException({
          ok: false,
          message: 'Credenciales incorrectas',
        });
      }
      return await assignJwtToken(user.uid, this.jwtService);
    } catch (error) {
      console.log({ error });
    }
  }

  async checkAuthStatus(uid: string) {
    const token = await assignJwtToken(uid, this.jwtService);
    const user = await this.usersRepository.findOne({
      where: { uid },
      select: [
        'id',
        'uid',
        'email',
        'firstName',
        'lastName',
        'created_at',
        'updated_at',
      ],
    });
    return {
      user,
      token,
    };
  }
}
