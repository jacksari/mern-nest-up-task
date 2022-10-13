import { ProjectService } from './project.service';
import { CreateProjectDto } from './dto/create-project.dto';
import { User } from 'src/entities/user.entity';
export declare class ProjectController {
    private projectService;
    constructor(projectService: ProjectService);
    findAll(): Promise<any>;
    createProject(createProjectDto: CreateProjectDto, user: User): Promise<{
        user: User;
        name: string;
        description: string;
        date: string;
        client: string;
    } & import("../../entities/project.entity").Project>;
}
