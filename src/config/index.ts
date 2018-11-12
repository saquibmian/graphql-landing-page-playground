import { LogLevel } from 'bunyan';
import { IPrincipal } from '../domain/IPrincipal';
import { IDatabaseConfig } from '../data/db';

interface IConfig {
    logging: {
        level: LogLevel,
    };

    auth: {
        anonymous: IPrincipal;
    };

    api: {
        host: string;
        port: number;
    };

    pg: IDatabaseConfig;
}

export const config: IConfig = {
    logging: {
        level: 'debug',
    },
    auth: {
        anonymous: {
            name: 'John Doe',
        },
    },
    api: {
        host: process.env.API_HOST || 'localhost',
        port: parseInt(process.env.API_PORT || '8000', 10),
    },
    pg: {
        path: process.env.DB_FILE || '',
        database: process.env.DB_DATABASE || '',
        user: process.env.DB_USER || '',
        password: process.env.DB_PASSWORD || '',
    },
};
