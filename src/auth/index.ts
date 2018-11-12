import { RequestHandler } from 'express';
import { IPrincipal } from '../domain/Principal';

export const anonymous: IPrincipal = {
    name: 'Saquib Mian',
};

export function authorization(): RequestHandler {
    return (req, res, next) => {
        res.locals.principal = anonymous;
    };
}
