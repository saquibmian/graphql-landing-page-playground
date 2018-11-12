import * as Logger from 'bunyan';
import { RequestHandler } from 'express';

let requestId = 0;

export function requestLogging(root: Logger): RequestHandler {
    return (req, res, next) => {
        const requestLogger = root.child({
            requestId: requestId++,
        });
        res.locals.logger = requestLogger;
        next();
    };
}
