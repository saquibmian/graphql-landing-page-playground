import { Context } from "../context";
import { Component } from "./Component";
import { StatusUpdate } from "./StatusUpdate";
import { IResolverObject } from "graphql-middleware/dist/types";
import { GQLType } from "../decorators/GQLType";

/**
 * Query implements the GraphQL Query type.
 */
@GQLType
export class Query {
    /**
     * Implements:
     *  component(name: String!): Component
     */
    async component(parent: never, args: { name: string }, ctx: Context): Promise<Component> {
        console.debug('called Query.component');
        return await ctx.components.getByName(ctx.principal, args.name);
    }

    /**
     * Implements:
     *  components: [Component!]!
     */
    async components(parent: never, args: any, ctx: Context): Promise<Component[]> {
        console.debug('called Query.components');
        return await ctx.components.getAll(ctx.principal);
    }

    /**
     * Implements:
     *  updates(component: String, mostRecent: Int, since: Int): [StatusUpdate!]!
     */
    async updates(parent: never, args: { component: string, mostRecent: string, since: string }, ctx: Context): Promise<StatusUpdate[]> {
        console.debug('called Query.updates');
        if (args.component != null) {
            const component = await ctx.components.getByName(ctx.principal, args.component);
            return await ctx.statusUpdates.getAll(ctx.principal, component);
        }
        // TODO handle mostRecent and since
        return await ctx.statusUpdates.getAll(ctx.principal);
    }
}