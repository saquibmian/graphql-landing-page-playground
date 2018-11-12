import { IComponentDAO } from '../../data/ComponentDAO';
import { IGQLContext } from '../context';
import { GQLType } from '../decorators/GQLType';
import { StatusUpdate } from './StatusUpdate';

/**
 * Component implements the GraphQL Component type.
 */
@GQLType
export class Component {

    constructor(
        private readonly _dao: IComponentDAO,
    ) { }

    get id(): number {
        return this._dao.id!;
    }

    /**
     * Implements:
     *  name: String!
     */
    get name(): string {
        return this._dao.name;
    }

    /**
     * Implements:
     *  statusUpdates(mostRecent: Int, since: Int): [StatusUpdate!]!
     */
    public async statusUpdates(parent: Component, args: any, ctx: IGQLContext): Promise<StatusUpdate[]> {
        ctx.logger.debug('called Component.statusUpdates');
        return await ctx.statusUpdates.getAll(ctx.principal, parent);
    }

}
