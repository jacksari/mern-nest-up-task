"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const DatabaseConfig = () => ({
    type: 'mysql',
    host: process.env.DB_HOST || 'localhost',
    port: parseInt(process.env.DB_PORT) || 3306,
    database: process.env.DB_NAME || 'up_task',
    username: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || 'root',
    entities: ['src/entities/*.entity{.ts,.js}'],
    synchronize: process.env.DB_SYNCHRONIZE || true,
    migrationsTableName: 'migrations',
    migrations: [
        'dist/src/database/migrations/*{.ts,.js}',
    ],
    cli: {
        migrationsDir: 'src/database/migrations',
    },
});
exports.default = DatabaseConfig;
//# sourceMappingURL=database.config.js.map