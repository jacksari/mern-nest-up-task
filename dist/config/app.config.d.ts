declare const _default: () => {
    environment: string;
    port: number;
    database: {
        type: string;
        host: string;
        port: number;
        database: string;
        username: string;
        password: string;
        entities: string[];
        synchronize: string | boolean;
        migrationsTableName: string;
        migrations: string[];
        cli: {
            migrationsDir: string;
        };
    };
};
export default _default;
