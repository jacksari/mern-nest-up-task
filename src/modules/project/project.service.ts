import { Injectable, Req } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/entities/user.entity';
import { Repository } from 'typeorm';
import { Project } from '../../entities/project.entity';
import { CreateProjectDto } from './dto/create-project.dto';

@Injectable()
export class ProjectService {
  constructor(
    @InjectRepository(Project)
    private projectsRepository: Repository<Project>,
  ) {}

  async createProject(createProjectDto: CreateProjectDto, user: User) {
    // console.log('user', req.user);
    return await this.projectsRepository.save({
      ...createProjectDto,
      user,
    });
  }

  async findAll() {
    return await this.projectsRepository.query(`
      select  
        p.name, 
        p.description, 
        p.status, 
        p.date, 
        p.client, 
        json_object(
          'name', CONCAT(u.firstName,' ',u.lastName),
          'email', u.email ,
          'status',u.status 
        ) user
      from projects p
      left join users u on u.id = p.user_id 
    `);
  }
}
