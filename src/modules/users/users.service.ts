import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/entities/user.entity';
import { Repository } from 'typeorm';
import { hashPassword } from './helpers.auth';
import { CreateUserDto } from './dto/create-user.dto';
import { LoginDto } from './dto/login.dto';
import { compare } from 'bcrypt';
import assignJwtToken from './config/jwt';
import { JwtService } from '@nestjs/jwt';

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
      where: { email: createUserDto.email },
    });
    if (userExist) {
      return new NotFoundException({
        ok: false,
        message: 'El usuario con ese email ya existe',
      });
    }
    return this.usersRepository.save({
      ...createUserDto,
      password: await hashPassword(createUserDto.password),
    });
  }
  async login(loginDto: LoginDto) {
    const { email, password } = loginDto;
    const user = await this.usersRepository.findOne({ where: { email } });
    if (!user) {
      return new NotFoundException({
        ok: false,
        message: 'El usuario no existe en la base de datos',
      });
    }
    const isPasswordMatched = await compare(password, user.password);
    if (!isPasswordMatched) {
      return new NotFoundException({
        ok: false,
        message: 'Credenciales incorrectas',
      });
    }
    return await assignJwtToken(user.email, this.jwtService);
  }
}
