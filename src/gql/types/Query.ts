import { IGQLContext } from '../context';
import { GQLType } from '../decorators/GQLType';
import { Component } from './Component';
import { StatusUpdate } from './StatusUpdate';

/**
 * Query implements the GraphQL Query type.
 */
@GQLType
export class Query {
    /**
     * Implements:
     *  component(name: String!): Component
     */
    public async component(parent: never, args: { name: string }, ctx: IGQLContext): Promise<Component> {
        ctx.logger.debug('called Query.component');
        return await ctx.components.getByName(ctx.principal, args.name);
    }

    /**
     * Implements:
     *  components: [Component!]!
     */
    public async components(parent: never, args: any, ctx: IGQLContext): Promise<Component[]> {
        ctx.logger.debug('called Query.components');
        return await ctx.components.getAll(ctx.principal);
    }

    /**
     * Implements:
     *  updates(component: String, mostRecent: Int, since: Int): [StatusUpdate!]!
     */
    public async updates(
        parent: never,
        args: { component: string, mostRecent: string, since: string },
        ctx: IGQLContext,
    ): Promise<StatusUpdate[]> {
        ctx.logger.debug('called Query.updates');
        if (args.component != null) {
            const component = await ctx.components.getByName(ctx.principal, args.component);
            return await ctx.statusUpdates.getAll(ctx.principal, component);
        }
        // TODO handle mostRecent and since
        return await ctx.statusUpdates.getAll(ctx.principal);
    }
}
