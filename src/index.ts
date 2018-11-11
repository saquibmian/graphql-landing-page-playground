import { GraphQLServer } from 'graphql-yoga'
import { Database } from './data/db';
import { resolvers } from './gql/resolvers';
import { typeDefs } from './gql/schema';
import { Request, Response } from 'express';
import { Context } from './gql/context';
import { ComponentService } from './service/ComponentService';
import { ComponentRepository } from './data/ComponentRepository';
import { StatusUpdateService } from './service/StatusUpdateService';
import { StatusUpdateRepository } from './data/StatusUpdateRepository';
import { printSchema } from 'graphql';
import { resolverMap } from './gql/decorators/_internal';

const db = new Database({
  path: process.env.DB_FILE || '',
  database: process.env.DB_DATABASE || '',
  user: process.env.DB_USER || '',
  password: process.env.DB_PASSWORD || '',
});

function contextFactory(): Context {
  const principal = { name: 'Saquib' };

  const componentRepo = new ComponentRepository(db);
  const statusUpdateRepo = new StatusUpdateRepository(db);

  const components = new ComponentService(componentRepo);
  const statusUpdates = new StatusUpdateService(componentRepo, statusUpdateRepo);

  return {
    principal,
    components,
    statusUpdates
  };
}

const server = new GraphQLServer({
  resolvers,
  typeDefs,
  context: contextFactory
});

server.get('/', (req: Request, res: Response) => res.json({ response: 'nothing here!' }));

Promise.resolve(true)
  .then(() => db.components.drop())
  .then(() => db.statusUpdates.drop())
  .then(() => db.components.sync())
  .then(() => db.statusUpdates.sync())
  .then(() => db.components.upsert({ name: 'first' }))
  .then(() => db.components.upsert({ name: 'second' }))
  .then(() => db.components.upsert({ name: 'third' }))
  .then(() => {

    server.start({
      port: 8000,
      endpoint: '/_graphql',
      subscriptions: '/_subscriptions',
      playground: '/_graphqlPlayground',
    }, opts => console.log(`Server is running on http://localhost:${opts.port}`));

  });
