import { resolverMap } from './decorators/_internal';
import { Mutation } from './types/Mutation';
import { Query } from './types/Query';

// Instantiate the schema roots. All others in the graph will be loaded automatically.
const roots = [
    Query,
    Mutation,
];

export const resolvers = resolverMap;
