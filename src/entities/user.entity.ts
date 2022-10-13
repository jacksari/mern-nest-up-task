import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  OneToMany,
  ManyToMany,
  BeforeInsert,
  BeforeUpdate,
} from 'typeorm';
import { Project } from './project.entity';

export enum statusUser {
  ACTIVO = 'ACTIVO',
  INACTIVO = 'INACTIVO',
}

export enum roleUser {
  ADMIN = 'ADMIN',
  USER = 'USER',
}

@Entity({
  name: 'users',
})
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    unique: true,
    nullable: false,
    length: 32,
  })
  uid: string;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column({
    type: 'enum',
    enum: statusUser,
    default: statusUser.INACTIVO,
  })
  status: statusUser;

  @Column({
    unique: true,
  })
  email: string;

  @Column({
    select: false,
  })
  password: string;

  @Column({
    nullable: true,
  })
  image: string;

  @Column({
    nullable: true,
  })
  dni: string;

  @Column({
    nullable: true,
  })
  phone: string;

  @Column({
    type: 'enum',
    enum: roleUser,
    default: roleUser.USER,
  })
  roles: roleUser;

  @OneToMany(() => Project, (project) => project.user)
  projects_team: Project[];

  @ManyToMany((type) => Project, (project) => project.users)
  projects: Project[];

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @DeleteDateColumn({ name: 'deleted_at' })
  deletedAt: Date;

  @BeforeInsert()
  checkFieldsInsert() {
    //   this.email = this.email.toLowerCase().trim();
    //   console.log('uid', uid(32));
    //   this.uid = uid(32);
  }

  @BeforeUpdate()
  checkFieldsUpdate() {
    // this.email = this.email.toLowerCase().trim();
  }
}
