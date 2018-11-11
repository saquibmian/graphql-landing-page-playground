import { Context } from "../context";
import { StatusUpdate } from "./StatusUpdate";
import { GQLType } from "../decorators/GQLType";

/**
 * Mutation implements the GraphQL Mutation type.
 */
@GQLType
export class Mutation {
    /**
     * Implements:
     *  postUpdate(component: String!, severity: Severity!, message: String!): StatusUpdate!
     */
    async postUpdate(parent: never, args: { component: string, severity: string, message: string }, ctx: Context): Promise<StatusUpdate> {
        console.debug('calling Mutation.postUpdate');
        const componentObject = await ctx.components.getByName(ctx.principal, args.component);
        return ctx.statusUpdates.create(ctx.principal, componentObject, args.severity, args.message);
    }
}