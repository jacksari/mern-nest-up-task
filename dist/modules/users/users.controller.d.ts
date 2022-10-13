import { User } from 'src/entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { LoginDto } from './dto/login.dto';
import { UsersService } from './users.service';
export declare class UsersController {
    private usersService;
    constructor(usersService: UsersService);
    findAll(): Promise<User[]>;
    create(createUserDto: CreateUserDto): Promise<import("@nestjs/common").NotFoundException | ({
        email: string;
        uid: string;
        password: string;
        firstName: string;
        lastName: string;
        image: string;
        dni: string;
        phone: string;
    } & User)>;
    login(loginDto: LoginDto): Promise<{
        token: string | import("@nestjs/common").UnauthorizedException;
    }>;
    getUserByToken(userUid: string): Promise<{
        user: User;
        token: string;
    }>;
}
