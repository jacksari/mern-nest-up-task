import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  ManyToOne,
  JoinColumn,
  ManyToMany,
  JoinTable,
} from 'typeorm';
import { User } from './user.entity';

@Entity({
  name: 'projects',
})
export class Project {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  description: string;

  @Column({ default: false })
  status: boolean;

  @Column()
  date: Date;

  @Column({
    nullable: false,
  })
  client: string;

  @ManyToOne(() => User, (user) => user.projects_team)
  @JoinColumn({ name: 'user_id', foreignKeyConstraintName: 'fk_user_project' })
  user: User;

  @ManyToMany((type) => User, (user) => user.projects, {
    cascade: true,
  })
  @JoinTable({
    joinColumn: {
      name: 'project_id',
    },
    inverseJoinColumn: {
      name: 'user_id',
    },
  })
  users: Project[];

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @DeleteDateColumn({ name: 'deleted_at' })
  deletedAt: Date;
}
