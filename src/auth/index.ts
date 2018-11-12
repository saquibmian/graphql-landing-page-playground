import { RequestHandler } from 'express';
import { IPrincipal } from '../domain/IPrincipal';
import { config } from '../config';

export function authorization(): RequestHandler {
    return (req, res, next) => {
        const principal = config.auth.anonymous;
        res.locals.principal = principal;

        res.locals.logger.trace({ principal }, 'authenticated user');

        next();
    };
}
