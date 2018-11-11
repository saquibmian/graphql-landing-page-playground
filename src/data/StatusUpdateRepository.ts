import { StatusUpdateDAO } from "./StatusUpdateDAO";
import { Database } from "./db";
import * as DataLoader from 'dataloader';
import * as _ from 'lodash';

export class StatusUpdateRepository {

    private readonly _dataloader: DataLoader<number, StatusUpdateDAO[]>;

    constructor(
        private readonly _db: Database
    ) {
        this._dataloader = new DataLoader(
            (ids: number[]) => StatusUpdateRepository.load(this._db, ids)
        );
    }

    private static async load(db: Database, toFetch: number[]): Promise<StatusUpdateDAO[][]> {
        const fetched = await db.statusUpdates.findAll({
            where: {
                componentId: toFetch
            }
        });

        const groupedByComponentId = _.groupBy(fetched, f => f.componentId);
        return toFetch.map(i => groupedByComponentId[i] || []);
    }

    async getAll(componentId?: number): Promise<StatusUpdateDAO[]> {
        if (componentId == null) {
            const all = await this._db.statusUpdates.findAll();
            return all;
        }
        const all = await this._dataloader.load(componentId);
        return all;
    }

    async create(item: StatusUpdateDAO): Promise<StatusUpdateDAO> {
        const created = this._db.statusUpdates.create(item);
        return created;
    }

}
