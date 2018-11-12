import { IGQLContext } from '../context';
import { GQLType } from '../decorators/GQLType';
import { StatusUpdate } from './StatusUpdate';

/**
 * Mutation implements the GraphQL Mutation type.
 */
@GQLType
export class Mutation {
    /**
     * Implements:
     *  postUpdate(component: String!, severity: Severity!, message: String!): StatusUpdate!
     */
    public async postUpdate(
        parent: never,
        args: { component: string, severity: string, message: string },
        ctx: IGQLContext,
    ): Promise<StatusUpdate> {
        ctx.logger.debug('calling Mutation.postUpdate');
        const componentObject = await ctx.components.getByName(ctx.principal, args.component);
        return ctx.statusUpdates.create(ctx.principal, componentObject, args.severity, args.message);
    }
}
