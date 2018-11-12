import { RequestHandler } from 'express';
import { IGQLContext } from './context';
import { ComponentRepository } from '../data/ComponentRepository';
import { StatusUpdateRepository } from '../data/StatusUpdateRepository';
import { ComponentService } from '../service/ComponentService';
import { StatusUpdateService } from '../service/StatusUpdateService';

export function requestContext(): RequestHandler {
    return (req, res, next) => {
        const db = res.locals.db;
        const principal = res.locals.principal;
        const logger = res.locals.logger;

        const componentRepo = new ComponentRepository(db);
        const statusUpdateRepo = new StatusUpdateRepository(db);

        const components = new ComponentService(componentRepo);
        const statusUpdates = new StatusUpdateService(componentRepo, statusUpdateRepo);

        const context: IGQLContext = {
            logger,
            principal,
            components,
            statusUpdates,
        };
        res.locals.graphqlContext = context;
        next();
    };
}
