import { ComponentDAO } from "../../data/ComponentDAO";
import { StatusUpdate } from "./StatusUpdate";
import { Context } from "../context";
import { GQLType } from "../decorators/GQLType";

/**
 * Component implements the GraphQL Component type.
 */
@GQLType
export class Component {

    constructor(
        private readonly _dao: ComponentDAO
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
    async statusUpdates(parent: Component, args: any, ctx: Context): Promise<StatusUpdate[]> {
        console.debug('called Component.statusUpdates');
        return await ctx.statusUpdates.getAll(ctx.principal, parent);
    }

}