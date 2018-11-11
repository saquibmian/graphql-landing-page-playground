import { StatusUpdateDAO } from "./StatusUpdateDAO";
import { Database } from "./db";

export class StatusUpdateRepository {

    constructor(
        private readonly _db: Database
    ) { }

    async getAll(componentId?: number): Promise<StatusUpdateDAO[]> {
        const all = this._db.statusUpdates.findAll({
            where: componentId == null ? undefined : { componentId }
        });
        return all;
    }

    async create(item: StatusUpdateDAO): Promise<StatusUpdateDAO> {
        const created = this._db.statusUpdates.create(item);
        return created;
    }

}
