import { User } from 'src/entities/user.entity';
import { Repository } from 'typeorm';
import { Project } from '../../entities/project.entity';
import { CreateProjectDto } from './dto/create-project.dto';
export declare class ProjectService {
    private projectsRepository;
    constructor(projectsRepository: Repository<Project>);
    createProject(createProjectDto: CreateProjectDto, user: User): Promise<{
        user: User;
        name: string;
        description: string;
        date: string;
        client: string;
    } & Project>;
    findAll(): Promise<any>;
}
