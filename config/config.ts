import * as dotenv from 'dotenv';
dotenv.config();

interface DatabaseConfig {
    username: string;
    password: string | undefined; 
    database: string;
    port?: string;
    host: string;
    dialect: "mysql";
};

interface Config {
    development: DatabaseConfig;
    test: DatabaseConfig;
    production: DatabaseConfig;
};

export const config: Config = {
    development: {
        username: process.env.DATABASE_USER as string,
        password: process.env.DATABASE_PASSWORD ? process.env.DATABASE_PASSWORD : undefined, 
        database: process.env.DATABASE_NAME as string,
        port: process.env.DATABASE_PORT,
        host: process.env.DATABASE_HOST as string,
        dialect: "mysql",
    },
    test: {
        username: 'root',
        password: undefined, 
        database: 'database_test',
        host: '127.0.0.1',
        dialect: 'mysql',
    },
    production: {
        username: 'root',
        password: undefined, 
        database: 'database_production',
        host: '127.0.0.1',
        dialect: 'mysql',
    },
};
