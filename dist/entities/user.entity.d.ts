import { Project } from './project.entity';
export declare enum statusUser {
    ACTIVO = "ACTIVO",
    INACTIVO = "INACTIVO"
}
export declare enum roleUser {
    ADMIN = "ADMIN",
    USER = "USER"
}
export declare class User {
    id: number;
    uid: string;
    firstName: string;
    lastName: string;
    status: statusUser;
    email: string;
    password: string;
    image: string;
    dni: string;
    phone: string;
    roles: roleUser;
    projects_team: Project[];
    projects: Project[];
    created_at: Date;
    updated_at: Date;
    deletedAt: Date;
    checkFieldsInsert(): void;
    checkFieldsUpdate(): void;
}
