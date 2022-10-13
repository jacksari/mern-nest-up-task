import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './modules/auth/auth.module';
import { TaskModule } from './modules/task/task.module';
import { UsersModule } from './modules/users/users.module';
import { ProjectModule } from './modules/project/project.module';
import { ConfigModule } from '@nestjs/config';
import { MessagesWsModule } from './modules/messages-ws/messages-ws.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'root',
      database: 'up_task',
      entities: ['dist/entities/*.js'],
      synchronize: true,
    }),
    AuthModule,
    TaskModule,
    UsersModule,
    ProjectModule,
    MessagesWsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
