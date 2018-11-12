import { importSchema } from 'graphql-import';

export { resolvers } from '../resolvers';
export const typeDefs = importSchema(__dirname + '/schema.graphql');
