import { Query } from "./types/Query";
import { Mutation } from "./types/Mutation";
import { resolverMap } from "./decorators/_internal";

// Instantiate the schema roots. All others in the graph will be loaded automatically.
var roots = [
    Query,
    Mutation
];

export const resolvers = resolverMap;
