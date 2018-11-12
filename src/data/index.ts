import { RequestHandler } from 'express';
import { Database, IDatabaseConfig } from './db';
import { rootLogger } from '../logging';
import { config } from '../config';

export function database(): RequestHandler {
    const db = new Database(config.pg);

    return (req, res, next) => {
        res.locals.db = db;
        rootLogger.trace('registering database in request');
        next();
    };
}
