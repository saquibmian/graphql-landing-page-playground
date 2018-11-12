import { Request, Response } from 'express';
import { GraphQLServer } from 'graphql-yoga';
import { resolvers } from './gql/resolvers';
import { typeDefs } from './gql/schema';
import { requestLogging } from './logging';
import { database } from './data';
import { config } from './config';
import { createLogger } from 'bunyan';
import { configureDevTools } from './dev';

const logger = createLogger({
  name: 'landing-page',
});

const server = new GraphQLServer({
  resolvers,
  typeDefs,
  context: (args: { res: Response }) => args.res.locals.graphqlContext,
});

// logging must be registered first
server.use(requestLogging(logger));
server.use(database(config.pg));
configureDevTools(server.express);

// catch-all route
server.get('/', (req: Request, res: Response) => {
  const response = {
    message: 'nothing is here!',
  };
  res.json(response);
});

server.start({
  port: 8000,
  endpoint: '/_graphql',
  subscriptions: '/_subscriptions',
  playground: '/_graphqlPlayground',
}, (opts) => logger.info(`Server is running on http://localhost:${opts.port}`));
