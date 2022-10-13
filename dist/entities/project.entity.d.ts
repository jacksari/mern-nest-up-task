import { User } from './user.entity';
export declare enum statusProject {
    PENDIENTE = "PENDIENTE",
    EN_PROCESO = "EN_PROCESO",
    FINALIZADO = "FINALIZADO"
}
export declare class Project {
    id: number;
    name: string;
    description: string;
    status: statusProject;
    date: Date;
    client: string;
    user: User;
    users: Project[];
    created_at: Date;
    updated_at: Date;
    deletedAt: Date;
}
