"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const typeorm_1 = require("typeorm");
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
};
const datasource = new typeorm_1.DataSource(opt);
datasource.initialize();
exports.default = datasource;
//# sourceMappingURL=data.source.js.map