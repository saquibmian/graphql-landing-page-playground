import * as graphqlHTTP from 'express-graphql';
import { RequestHandler } from 'express';
import { IGQLContext } from './context';
import { ComponentRepository } from '../data/ComponentRepository';
import { StatusUpdateRepository } from '../data/StatusUpdateRepository';
import { ComponentService } from '../service/ComponentService';
import { StatusUpdateService } from '../service/StatusUpdateService';
import { makeExecutableSchema } from 'graphql-tools';
import { typeDefs } from './schema';
import { resolverMap } from './decorators/_internal';

export function graphql(playground?: boolean): RequestHandler {
    const schema = makeExecutableSchema({
        typeDefs,
        resolvers: resolverMap,
    });

    return (req, res) => {
        const handler = graphqlHTTP({
            schema,
            graphiql: playground,
            context: res.locals.graphqlContext,
        });
        return handler(req, res);
    };
}

export function requestContext(): RequestHandler {
    return (req, res, next) => {
        const db = res.locals.db;
        const principal = res.locals.principal;
        const logger = res.locals.logger;

        const componentRepository = new ComponentRepository(logger, db.components);
        const statusUpdateRepository = new StatusUpdateRepository(logger, db.statusUpdates);

        const components = new ComponentService(logger, componentRepository);
        const statusUpdates = new StatusUpdateService(logger, componentRepository, statusUpdateRepository);

        const context: IGQLContext = {
            logger,
            principal,
            components,
            statusUpdates,
        };
        res.locals.graphqlContext = context;

        logger.trace('registered graphql context for request');

        next();
    };
}
