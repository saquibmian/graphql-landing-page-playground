import * as Logger from 'bunyan';
import { RequestHandler } from 'express';
import { createLogger } from 'bunyan';
import { config } from '../config';

export const rootLogger = createLogger({
    name: 'landing-page',
    level: config.logging.level,
});

let requestId = 0;

export function requestLogging(parent: Logger): RequestHandler {
    return (req, res, next) => {
        const requestLogger = parent.child({
            requestId: requestId++,
        });
        res.locals.logger = requestLogger;

        requestLogger.trace('created a request logger');

        next();
    };
}
