import * as express from 'express';
import * as graphqlHTTP from 'express-graphql';
import { Request, Response } from 'express';
import { requestLogging, rootLogger } from './logging';
import { database } from './data';
import { config } from './config';
import { seedDatabase } from './dev';
import { requestContext, schema } from './gql';
import { authorization } from './auth';

const server = express()
  // logging must be registered first
  .use(requestLogging(rootLogger))
  .use(database())
  .use(authorization())
  .use(requestContext())
  .use('/_graphql', graphqlHTTP({
    schema,
    graphiql: false,
    context: (args: { res: Response }) => args.res.locals.graphqlContext,
  }))
  .use('/_playground', graphqlHTTP({
    schema,
    graphiql: true,
    context: (args: { res: Response }) => args.res.locals.graphqlContext,
  }));

if (true) {
  server.use('/seed', seedDatabase);
}

// catch-all route
server.get('/', (req: Request, res: Response) => {
  res.json({ message: `This is not the page you're looking for!` });
});

server.listen(config.api.port, config.api.host, () => {
  rootLogger.info(`Server is running on http://localhost:${config.api.port}`);
});
