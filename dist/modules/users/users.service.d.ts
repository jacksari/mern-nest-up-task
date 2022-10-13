import { NotFoundException, UnauthorizedException } from '@nestjs/common';
import { User } from 'src/entities/user.entity';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { LoginDto } from './dto/login.dto';
import { JwtService } from '@nestjs/jwt';
export declare class UsersService {
    private usersRepository;
    private jwtService;
    constructor(usersRepository: Repository<User>, jwtService: JwtService);
    findAll(): Promise<User[]>;
    findOne(id: number): Promise<User>;
    remove(id: string): Promise<void>;
    create(createUserDto: CreateUserDto): Promise<NotFoundException | ({
        email: string;
        uid: string;
        password: string;
        firstName: string;
        lastName: string;
        image: string;
        dni: string;
        phone: string;
    } & User)>;
    login(loginDto: LoginDto): Promise<string | UnauthorizedException>;
    checkAuthStatus(uid: string): Promise<{
        user: User;
        token: string;
    }>;
}
