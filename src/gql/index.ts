import * as graphqlHTTP from 'express-graphql';
import { RequestHandler, Response } from 'express';
import { IGQLContext } from './context';
import { ComponentRepository } from '../data/ComponentRepository';
import { StatusUpdateRepository } from '../data/StatusUpdateRepository';
import { ComponentService } from '../service/ComponentService';
import { StatusUpdateService } from '../service/StatusUpdateService';
import { makeExecutableSchema } from 'graphql-tools';
import { typeDefs } from './schema';
import { resolverMap } from './decorators/_internal';

export function graphql(): RequestHandler {
    const schema = makeExecutableSchema({
        typeDefs,
        resolvers: resolverMap,
    });

    return (req, res) => {
        const handler = graphqlHTTP({
            schema,
            context: createContext(res),
        });
        return handler(req, res);
    };
}

function createContext(res: Response): IGQLContext {
    const db = res.locals.db;
    const principal = res.locals.principal;
    const logger = res.locals.logger;

    const componentRepository = new ComponentRepository(logger, db.components);
    const statusUpdateRepository = new StatusUpdateRepository(logger, db.statusUpdates);

    const components = new ComponentService(logger, componentRepository);
    const statusUpdates = new StatusUpdateService(logger, componentRepository, statusUpdateRepository);

    return {
        logger,
        principal,
        components,
        statusUpdates,
    };
}
