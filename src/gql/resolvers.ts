import { Query } from "./types/Query";
import { Mutation } from "./types/Mutation";
import { Component } from "./types/Component";
import { resolverMap } from "./decorators/_internal";
import { StatusUpdate } from "./types/StatusUpdate";

// TODO: this is required to force Typescript to run decorators...is there a better way?
var types = [
    Component,
    StatusUpdate,
    Query,
    Mutation
];

export const resolvers = resolverMap;
