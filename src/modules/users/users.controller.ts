import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { User } from 'src/entities/user.entity';
import { CurrentUser } from './config/current-user.decorator';
import { CreateUserDto } from './dto/create-user.dto';
import { LoginDto } from './dto/login.dto';
import { UserRoleGuard } from './guards/user-role.guard';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Get()
  @UseGuards(AuthGuard(), UserRoleGuard)
  findAll(): Promise<User[]> {
    return this.usersService.findAll();
  }

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @Post('login')
  async login(@Body() loginDto: LoginDto) {
    const token = await this.usersService.login(loginDto);
    return { token };
  }

  @Get('profile')
  @UseGuards(AuthGuard())
  async getUserByToken(@CurrentUser('uid') userUid: string) {
    return this.usersService.checkAuthStatus(userUid);
  }
}
