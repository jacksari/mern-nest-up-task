import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { ProjectService } from './project.service';
import { CreateProjectDto } from './dto/create-project.dto';
import { User } from 'src/entities/user.entity';
import { CurrentUser } from '../users/config/current-user.decorator';
import { AuthGuard } from '@nestjs/passport';

@Controller('project')
export class ProjectController {
  constructor(private projectService: ProjectService) {}

  @Get()
  async findAll() {
    return await this.projectService.findAll();
  }

  @Post()
  @UseGuards(AuthGuard())
  async createProject(
    @Body() createProjectDto: CreateProjectDto,
    @CurrentUser() user: User,
  ) {
    // console.log('user', req.user);
    // return 'Hola';
    return this.projectService.createProject(
      {
        ...createProjectDto,
      },
      user,
    );
  }
}
