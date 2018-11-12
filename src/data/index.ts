import { RequestHandler } from 'express';
import { Database, IDatabaseConfig } from './db';

export function database(config: IDatabaseConfig): RequestHandler {
    const db = new Database(config);

    return (req, res, next) => {
        res.locals.db = db;
        next();
    };
}
