import 'reflect-metadata';
import { DataSource, DataSourceOptions } from 'typeorm';

const opt = {
  type: 'mysql',
  host: 'localhost',
  port: 3306,
  username: 'root',
  password: 'root',
  database: 'up_task',
  synchronize: true,
  logging: false,
  entities: ['src/entities/*.ts'],
  migrations: ['src/database/migrations/*.ts'],
  subscribers: [],
  cli: {
    entitiesDir: 'src/entities',
    migrationsDir: 'src/database/migrations',
    subscribersDir: 'subscriber',
  },
} as DataSourceOptions;

const datasource = new DataSource(opt); // config is one that is defined in datasource.config.ts file
datasource.initialize();
export default datasource;
